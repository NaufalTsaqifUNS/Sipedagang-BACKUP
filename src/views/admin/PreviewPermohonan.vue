<script setup>
import { ref, computed, onMounted } from 'vue';
import { PermohonanService } from '@/services';
import { handleApiError } from '@/services/apiUtils';
import Swal from 'sweetalert2';

const formData = ref({
  namaSupplier: '',
  namaPerusahaan: '',
  jenisBank: '',
  noRekening: '',
  noPreorder: '',
  tanggalPengadaan: '',
  jenisPengadaanBarang: '',
  kuantum: '',
  satuan: 'KG', // Default satuan
  inData: [], // Array to store IN entries
  jumlahPembayaran: '',
  spp: ''
});

// Loading state
const isLoading = ref(false);

// Load form data from localStorage or API on component mount
onMounted(async () => {
  const permohonanId = localStorage.getItem('permohonanId');
  const savedData = localStorage.getItem('permohonanFormData');
  
  try {
    // Set loading state before we fetch data
    isLoading.value = true;
    
    if (permohonanId) {
      // If we have an ID, try to fetch from API first
      try {
        const response = await PermohonanService.getById(permohonanId);
          // Map API response to match our form data structure
        const apiData = {
          id: response.data.id,
          namaSupplier: response.data.nama_suplier,
          namaPerusahaan: response.data.nama_perusahaan,
          jenisBank: response.data.jenis_bank,
          noRekening: response.data.no_rekening,
          noPreorder: response.data.no_preorder,
          tanggalPengadaan: response.data.tanggal_pengadaan,
          jenisPengadaanBarang: response.data.jenis_pengadaan_barang,
          kuantum: response.data.kuantum,
          satuan: response.data.satuan || 'KG',
          inData: Array.isArray(response.data.in_data) ? response.data.in_data : [],
          jumlahPembayaran: response.data.jumlah_pembayaran,
          spp: response.data.spp,
          status: response.data.status,
          user_id: response.data.user_id
        };
        
        // Ensure inData is valid
        if (!apiData.inData || !Array.isArray(apiData.inData)) {
          apiData.inData = [];
        }
        
        // If inData is empty but we have kuantum and satuan, create a default entry
        if (apiData.inData.length === 0 && apiData.kuantum) {
          apiData.inData.push({
            tanggal_in: apiData.tanggalPengadaan,
            kuantum_in: apiData.kuantum,
            satuan: apiData.satuan || 'KG'
          });
        }
        
        formData.value = apiData;
        console.log('Loaded formData from API:', formData.value);
        
        // Save the API data to localStorage for future use
        localStorage.setItem('permohonanFormData', JSON.stringify(apiData));
      } catch (error) {
        handleApiError(error, {
          fallbackMessage: 'Gagal memuat data permohonan dari server',
          showAlert: false
        });
        
        // Fall back to localStorage if API fails
        if (savedData) {
          processLocalData(savedData);
        }
      } finally {
        isLoading.value = false;
      }
    } else if (savedData) {
      // If no ID but we have saved data, use it
      processLocalData(savedData);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  
  // Check if auto-print is requested
  const autoPrint = localStorage.getItem('autoPrint');
  if (autoPrint === 'true') {
    // Clear the auto-print flag
    localStorage.removeItem('autoPrint');
    
    // Give a small delay for the document to render properly before printing
    setTimeout(() => {
      printDocument();
    }, 500);
  }
});

// Helper function to process local data
const processLocalData = (savedData) => {
  try {
    const parsedData = JSON.parse(savedData);
    
    // Ensure field name compatibility - both old and new data formats
    if (parsedData.dataIN && !parsedData.inData) {
      parsedData.inData = parsedData.dataIN;
    }
    
    if (parsedData.nomerRekening && !parsedData.noRekening) {
      parsedData.noRekening = parsedData.nomerRekening;
    }
    
    if (parsedData.nomerPO && !parsedData.noPreorder) {
      parsedData.noPreorder = parsedData.nomerPO;
    }
    
    if (parsedData.jenisPengadaan && !parsedData.jenisPengadaanBarang) {
      parsedData.jenisPengadaanBarang = parsedData.jenisPengadaan;
    }
    
    if (parsedData.jumlahSPP && !parsedData.spp) {
      parsedData.spp = parsedData.jumlahSPP;
    }
    
    // Ensure inData is always initialized as an array
    if (!parsedData.inData || !Array.isArray(parsedData.inData)) {
      parsedData.inData = [];
    }
    
    // If inData is empty but we have kuantum and satuan, create a default entry
    if (parsedData.inData.length === 0 && parsedData.kuantum) {
      parsedData.inData.push({
        tanggal_in: parsedData.tanggalPengadaan,
        kuantum_in: parsedData.kuantum,
        satuan: parsedData.satuan || 'KG'
      });
    }
    
    formData.value = parsedData;
    console.log('Loaded formData from localStorage:', formData.value);
  } catch (error) {
    console.error('Error parsing form data:', error);
  }
};

// Format tanggalPengadaan into separate day, month, year
const tanggalFormatted = computed(() => {
  if (!formData.value.tanggalPengadaan) return { day: '', month: '', year: '' };
  
  const date = new Date(formData.value.tanggalPengadaan);
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 
    'Mei', 'Juni', 'Juli', 'Agustus', 
    'September', 'Oktober', 'November', 'Desember'
  ];
  
  return {
    day: date.getDate().toString(),
    month: months[date.getMonth()],
    year: date.getFullYear().toString()
  };
});

// Get current date for the letter date
const currentDate = computed(() => {
  const today = new Date();
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 
    'Mei', 'Juni', 'Juli', 'Agustus', 
    'September', 'Oktober', 'November', 'Desember'
  ];
  
  return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
});

// Function to format tanggal from ISO string to dd/mm/yyyy
const formatTanggal = (isoDate) => {
  if (!isoDate) return '-';
  
  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return isoDate; // Return original if invalid date
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    return isoDate; // Return the original if parsing fails
  }
};

// Function to get month name
const getMonthName = (monthIndex) => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 
    'Mei', 'Juni', 'Juli', 'Agustus', 
    'September', 'Oktober', 'November', 'Desember'
  ];
  return months[monthIndex];
};

// Function to get formatted date for the letter header
const getFormattedHeaderDate = () => {
  const today = new Date();
  return `Surakarta, ${today.getDate()} ${getMonthName(today.getMonth())} ${today.getFullYear()}`;
};

// Function to calculate total kuantum from inData
const calculateTotalKuantum = (numberOnly = false) => {
  if (!formData.value.inData || formData.value.inData.length === 0) {
    return formData.value.kuantum + (numberOnly ? '' : ` ${formData.value.satuan}`);
  }
  
  const total = formData.value.inData.reduce((sum, item) => {
    const kuantum = parseFloat(item.kuantum_in) || 0;
    return sum + kuantum;
  }, 0);
  
  return total + (numberOnly ? '' : ` ${formData.value.satuan}`);
};

// Function to format currency in Indonesian Rupiah format
const formatRupiah = (amount) => {
  if (!amount) return 'Rp 0';
  
  // First, clean the input if it has formatting characters
  let cleanAmount = typeof amount === 'string' 
    ? amount.replace(/[^\d,.-]/g, '') // Remove all non-numeric characters except decimal and minus
    : amount;
    
  // Convert to number and ensure it's a valid number
  const number = parseFloat(cleanAmount);
  if (isNaN(number)) return 'Rp 0';
  
  // Format the number with thousand separators using localization
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
};
const printDocument = () => {
    window.print();
};

// Function to download kwitansi from API
const downloadKwitansi = async () => {
  const permohonanId = localStorage.getItem('permohonanId');
  if (!permohonanId) {
    Swal.fire({
      title: 'Error',
      text: 'ID permohonan tidak ditemukan',
      icon: 'error',
      confirmButtonColor: '#0099FF'
    });
    return;
  }
  
  try {
    isLoading.value = true;
    const response = await PermohonanService.downloadKwitansi(permohonanId);
    
    // Create a blob from the PDF data
    const blob = new Blob([response.data], { type: 'application/pdf' });
    
    // Create a URL for the blob
    const fileURL = window.URL.createObjectURL(blob);
    
    // Create a temporary link and trigger the download
    const link = document.createElement('a');
    link.href = fileURL;
    link.setAttribute('download', `kwitansi_${permohonanId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL
    window.URL.revokeObjectURL(fileURL);
    
  } catch (error) {
    handleApiError(error, {
      fallbackMessage: 'Gagal mengunduh kwitansi'
    });
  } finally {
    isLoading.value = false;
  }
};

// Function to verify (approve) the permohonan
const verifyPermohonan = async () => {
  const permohonanId = localStorage.getItem('permohonanId');
  if (!permohonanId) {
    Swal.fire({
      title: 'Error',
      text: 'ID permohonan tidak ditemukan',
      icon: 'error',
      confirmButtonColor: '#0099FF'
    });
    return;
  }
  
  // Ask for confirmation
  Swal.fire({
    title: 'Konfirmasi Verifikasi',
    text: 'Apakah Anda yakin ingin menyetujui permohonan ini?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#4CAF50',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Setujui',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        isLoading.value = true;
        
        // Send verification request to API with optional note
        await PermohonanService.verifyPermohonan(permohonanId, {
          note: 'Disetujui oleh admin'
        });
        
        // Update local form data
        formData.value.status = 'approved';
        
        Swal.fire(
          'Berhasil!',
          'Permohonan telah disetujui.',
          'success'
        );
      } catch (error) {
        handleApiError(error, {
          fallbackMessage: 'Gagal memverifikasi permohonan'
        });
      } finally {
        isLoading.value = false;
      }
    }
  });
};

// Function to reject the permohonan
const rejectPermohonan = async () => {
  const permohonanId = localStorage.getItem('permohonanId');
  if (!permohonanId) {
    Swal.fire({
      title: 'Error',
      text: 'ID permohonan tidak ditemukan',
      icon: 'error',
      confirmButtonColor: '#0099FF'
    });
    return;
  }
  
  // Ask for rejection reason
  Swal.fire({
    title: 'Alasan Penolakan',
    input: 'textarea',
    inputLabel: 'Masukkan alasan penolakan permohonan',
    inputPlaceholder: 'Ketik alasan penolakan di sini...',
    inputAttributes: {
      'aria-label': 'Ketik alasan penolakan di sini'
    },
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Tolak Permohonan',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        isLoading.value = true;
        
        // Send rejection request to API with reason
        await PermohonanService.rejectPermohonan(permohonanId, {
          reason: result.value || 'Ditolak oleh admin',
          note: 'Permohonan ditolak'
        });
        
        // Update local form data
        formData.value.status = 'rejected';
        formData.value.rejectionReason = result.value;
        
        Swal.fire(
          'Berhasil!',
          'Permohonan telah ditolak.',
          'success'
        );
      } catch (error) {
        handleApiError(error, {
          fallbackMessage: 'Gagal menolak permohonan'
        });
      } finally {
        isLoading.value = false;
      }
    }
  });
};
</script>

<template>  
<div class="flex flex-col items-center">    <!-- Tombol Print dan status permohonan yang hanya muncul di layar (tidak saat mencetak) -->
    <div class="w-full max-w-[210mm] py-4 px-12 mx-auto print:hidden">      <div v-if="formData && formData.status" class="mb-4">
        <div class="flex items-center">
          <span class="text-gray-700 font-medium mr-2">Status:</span>
          <span 
            :class="{
              'bg-green-100 text-green-800': formData.status === 'approved',
              'bg-red-100 text-red-800': formData.status === 'rejected',
              'bg-yellow-100 text-yellow-800': formData.status === 'pending',
              'bg-blue-100 text-blue-800': formData.status === 'processing' || !['approved', 'rejected', 'pending'].includes(formData.status)
            }"
            class="px-3 py-1 rounded-full text-sm font-medium"
          >
            {{ formData.status === 'approved' ? 'Disetujui' : 
               formData.status === 'rejected' ? 'Ditolak' : 
               formData.status === 'pending' ? 'Menunggu' : 
               formData.status || 'Dalam Proses' }}
          </span>
        </div>
        
        <!-- Show rejection reason if available -->
        <div v-if="formData.status === 'rejected' && formData.rejectionReason" class="mt-2">
          <p class="text-red-800 text-sm">
            <span class="font-medium">Alasan penolakan:</span> {{ formData.rejectionReason }}
          </p>
        </div>
      </div>
        <div class="flex justify-between items-center flex-wrap gap-2">
        <div>
          <button @click="$router.go(-1)" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors">
            Kembali
          </button>
          
          <!-- Admin action buttons - only show for pending status -->
          <template v-if="formData.status !== 'approved' && formData.status !== 'rejected'">
            <button 
              @click="verifyPermohonan" 
              class="ml-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="inline-block mr-2">
                <svg class="animate-spin h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Setujui
            </button>
            <button 
              @click="rejectPermohonan" 
              class="ml-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="inline-block mr-2">
                <svg class="animate-spin h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Tolak
            </button>
          </template>
        </div>
        
        <div class="flex space-x-2">
          <button 
            @click="downloadKwitansi" 
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium transition-colors" 
            :disabled="isLoading || formData.status !== 'approved'"
            :title="formData.status !== 'approved' ? 'Kwitansi hanya tersedia untuk permohonan yang disetujui' : ''"
          >
            {{ isLoading ? 'Loading...' : 'Download Kwitansi' }}
          </button>
          <button @click="printDocument" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors">
            Cetak Dokumen
          </button>
        </div>
      </div>
    </div>
      <!-- Loading indicator -->
    <div v-if="isLoading" class="flex flex-col justify-center items-center h-[50vh] w-full">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      <p class="mt-4 text-blue-600 text-lg font-medium">Memuat data...</p>
    </div>
    
    <div v-else class="flex justify-center flex-col">
      <!-- Halaman Pertama -->
      <div class="w-full max-w-[210mm] min-h-[297mm] p-10 px-12 mx-auto font-arial leading-normal text-black relative print:shadow-none page">
        <div class="text-center mb-12">
          <h1 class="m-0 font-bold text-lg uppercase font-times">SURAT PERMOHONAN PEMBAYARAN</h1>
          <h2 class="m-0 font-bold text-lg uppercase font-times">PENGADAAN GABAH/BERAS DALAM NEGERI TAHUN 2025</h2>
        </div>

        <div class="mt-8">
          <p class="m-0 leading-loose">Kepada Yth.</p>
          <p class="m-0 leading-loose">Pemimpin/Wakil Pemimpin</p>
          <p class="m-0 leading-loose">Perum BULOG Kantor Cabang Surakarta</p>
          <p class="m-0 leading-loose">Di Tempat</p>
        </div>

        <div class="mt-8 text-justify text-base">          <p class="leading-loose mb-0">
            Bersama ini kami, 
            <span>{{ formData.namaPerusahaan }}</span> 
            menyampaikan permohonan pembayaran 
            <span>{{ formData.jenisPengadaan }}</span> 
            Pengadaan Dalam Negeri Tahun 2025 sebanyak 
            <span>{{ calculateTotalKuantum() }}</span> 
            dengan bukti dokumen terlampir.
          </p>
          
          <p class="mt-4 leading-loose mb-0">
            Mohon kiranya harga 
            <span>{{ formData.jenisPengadaan }}</span> 
            tersebut di atas dapat dibayar / dipindahbukukan ke rekening Kami Bank 
            <span>{{ formData.jenisBank }}</span> 
            sebagaimana No Rekening
            <span>{{ formData.nomerRekening }}</span> 
            Sesuai PO No 
            <span>{{ formData.nomerPO }}</span>
          </p>
          
          <p class="mt-4 leading-loose mb-0">
            Tanggal 
            <span>{{ tanggalFormatted.day }}</span> 
            Bulan 
            <span>{{ tanggalFormatted.month }}</span> 
            Tahun 
            <span>{{ tanggalFormatted.year }}</span>
          </p>
          
          <p class="mt-4 leading-loose mb-0">
            Demikian disampaikan dan atas perkenannya diucapkan terima kasih.
          </p>
        </div>
            <p class="text-right">Surakarta, <span>{{ currentDate }}</span></p>
        <p class="text-right">Pemohon</p>
        
        <div class="h-16"></div>
        
        <p class="text-right mt-10"><span>{{ formData.namaPerusahaan }}</span></p>
        <p class="text-right"><span>({{ formData.namaSupplier }})</span></p>
      </div>
      
      <!-- Halaman Kedua - Format Surat Permohonan Pembayaran -->
      <div class="w-full max-w-[210mm] min-h-[297mm] p-10 px-12 mx-auto font-arial leading-normal text-black relative print:shadow-none page">        <!-- Header dengan format seperti di gambar -->
        <div class="flex justify-between mb-5">
          <div></div>
          <div class="text-right">
            <p class="m-0">Surakarta, {{ currentDate }}</p>
          </div>
        </div>
        
        <!-- Nomor, Hal, dan detail -->
        <div class="flex gap-2 mb-1">
          <div class="w-16">No</div>
          <div class="w-4">:</div>
          <div>Permohonan Pembayaran</div>
        </div>
          <div class="flex gap-2 mb-4">
          <div class="w-16">Hal</div>
          <div class="w-4">:</div>
          <div>
            <p class="m-0">Pengadaan DN <span>{{ formData.jenisPengadaan }}</span></p>
          </div>
        </div>
        
        <!-- Kepada section -->
        <div class="mb-3 ml-[20mm]">
          <p class="m-0">Kepada</p>
          <p class="m-0">Yth. Pemimpin / Wakil Pemimpin</p>
          <p class="m-0">Perum BULOG Kantor Cabang Surakarta</p>
          <p class="m-0">Jl. LU. Adisucipto No. 17 Surakarta</p>
        </div>
          <!-- Dengan Hormat and PO details -->
        <div class="mb-2">
          <p class="m-0">Dengan Hormat,</p>          <p class="m-0">
            Menunjuk kontrak Purchashing Order (PO) No 
            <span class="underline">{{ formData.nomerPO }}</span> Tanggal 
            <span class="underline">{{ tanggalFormatted.day }}</span> Bulan 
            <span class="underline">{{ tanggalFormatted.month }}</span> Tahun 
            <span class="underline">{{ tanggalFormatted.year }}</span>
          </p>
        </div>
        
        <!-- Kuantum information without dots -->
        <div class="mb-1">
          <div class="flex">
            <div class="w-[40%]">Kuantum</div>
            <div class="w-[2%]">:</div>
            <div class="flex-1">              <div class="float-right">
                {{ calculateTotalKuantum(true) }} {{ formData.satuan }}
              </div>
            </div>
          </div>
        </div>
          <div class="mb-1">
          <div class="flex">
            <div class="w-[40%]">Jumlah diajukan untuk pembayaran</div>
            <div class="w-[2%]">:</div>
            <div class="flex-1">
              <div class="float-right">
                {{ formData.jumlahPembayaran ? formatRupiah(formData.jumlahPembayaran) : 'Rp 0' }}
              </div>
            </div>
          </div>
        </div>
          <div class="mb-3">          <div class="flex">
            <div class="w-[40%]">No. SPP</div>
            <div class="w-[2%]">:</div>
            <div class="flex-1">
              <div class="float-right">
                {{ formData.spp || formData.jumlahSPP || '-' }}
              </div>
            </div>
          </div>
        </div>
          <!-- Permohonan pembayaran section -->
        <div class="mb-1">          <p class="m-0">Dengan ini kami mengajukan permohonan pembayaran pengadaan {{ formData.jenisPengadaanBarang }} sesuai IN :</p>
        </div>
          <!-- Data entries without dotted lines and numbering -->
        <template v-if="formData.inData && formData.inData.length > 0">
          <div v-for="(item, index) in formData.inData" :key="index" class="mb-1">
            <div class="flex">
              <div class="w-[10%]">No. {{ index + 1 }}</div>
              <div class="w-[25%]">Tgl {{ formatTanggal(item.tanggal_in) }}</div>
              <div class="w-[15%]">kuantum :</div>
              <div class="flex-1">
                <div class="float-right">
                  {{ item.kuantum_in }} {{ item.satuan || formData.satuan }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <!-- Default entry when no dataIN is available -->
          <div class="mb-1">
            <div class="flex">
              <div class="w-[10%]">No. 1</div>
              <div class="w-[25%]">Tgl {{ formatTanggal(formData.tanggalPengadaan) }}</div>
              <div class="w-[15%]">kuantum :</div>
              <div class="flex-1">
                <div class="float-right">
                  {{ formData.kuantum }} {{ formData.satuan }}
                </div>
              </div>
            </div>
          </div>
        </template>
          <!-- Jumlah -->
        <div class="mb-5">
          <div class="flex">
            <div class="w-[10%]"></div>
            <div class="w-[25%]"></div>
            <div class="w-[15%]">Jumlah :</div>            <div class="flex-1">
              <div class="float-right">
                {{ calculateTotalKuantum(true) }} {{ formData.satuan }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Terlampir section -->
        <div class="mb-1">          <p class="m-0 underline">Terlampir :</p>
          <div class="flex gap-2">
            <div class="w-[25%]">PO</div>
            <div>: 1 set</div>
          </div>
          <div class="flex gap-2">
            <div class="w-[25%]">Dokumen IN</div>
            <div>: 1 set</div>
          </div>
          <div class="flex gap-2">
            <div class="w-[25%]">Sertifikat LHPK</div>
            <div>: 1 set</div>
          </div>
        </div>
        
        <div class="mb-5">
          <p class="m-0">Demikian atas terkabulnya permohonan tersebut diucapkan terima kasih.</p>
        </div>
          <!-- DISPOSISI section -->
        <div class="flex justify-between mt-4">
          <!-- Left side - DISPOSISI box -->
          <div class="w-[45%] border border-black p-2">            <div class="text-center underline mb-2">DISPOSISI :</div>
            <p class="italic m-0">AM Administrasi dan Keuangan</p>
            <div class="ml-4 mt-2">
              <p class="m-0">- &nbsp;&nbsp;&nbsp; Dibayarkan Sesuai Ketentuan</p>
              <p class="m-0">- &nbsp;&nbsp;&nbsp; Tertib Administrasi</p>
            </div>
          </div>
            <!-- Right side - Pemohon -->
          <div class="w-[45%] text-center">
            <p class="mb-12">Pemohon</p>
            <p class="underline">{{ formData.namaPerusahaan }}</p>
            <p>({{ formData.namaSupplier }})</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  body {
    margin: 0;
    padding: 0;
  }
  button {
    display: none;
  }
  .page {
    page-break-after: avoid;
    margin: 0;
    padding: 10mm 20mm;
  }
}

/* Tambahkan font-family Arial ke seluruh komponen */
.font-arial {
  font-family: Arial, Helvetica, sans-serif;
}

/* Tambahkan font-family Times New Roman untuk judul */
.font-times {
  font-family: "Times New Roman", Times, serif !important;
}

/* Pastikan seluruh text menggunakan Arial kecuali yang diberikan class khusus */
p, span {
  font-family: Arial, Helvetica, sans-serif !important;
}

/* Styling untuk border dotted dan underline */
.border-dotted {
  border-style: dotted !important;
  border-bottom-width: 1px !important;
}

.underline {
  text-decoration: underline;
}
</style>