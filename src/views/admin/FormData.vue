<script setup>
  import { ref, watch } from 'vue'
  import AdminLayout from '@/layouts/AdminLayout.vue'
  import FormComponent from '@/components/FormComponent.vue'
  import { useRouter } from 'vue-router'
  import Swal from 'sweetalert2'
  import { PermohonanService } from '@/services'
  import { handleApiError, showSuccessNotification } from '@/services/apiUtils'

  const router = useRouter()

  // Data Pemohon
  const namaSuplier = ref('')
  const namaPerusahaan = ref('')
  const jenisBank = ref('mandiri')
  const noRekening = ref('')

  // Detail Purchasing Order
  const noPreorder = ref('')
  const tanggalPengadaan = ref('')
  const jenisPengadaanBarang = ref('beras')
  const kuantum = ref('')
  const satuan = ref('KG')

  // Data IN
  const inData = ref([{ tanggal_in: '', kuantum_in: '', satuan: 'KG' }])

  // Watch satuan changes and update all inData rows
  watch(satuan, (newSatuan) => {
    inData.value.forEach((row) => {
      row.satuan = newSatuan
    })
  })

  // Informasi Pembayaran
  const jumlahPembayaran = ref('')
  const spp = ref('')

  // Formatted values for Rupiah display
  const formattedPembayaran = ref('')
  const formattedSPP = ref('')

  // Function to format value as Rupiah in input fields
  const formatRupiahInput = (value) => {
    if (!value) return ''

    // Remove all non-numeric characters
    let number = value.toString().replace(/[^\d]/g, '')

    // Format the number with thousand separators
    return 'Rp ' + number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  // Function to extract numeric value from formatted Rupiah string
  const extractNumericValue = (rupiahString) => {
    if (!rupiahString) return ''
    return rupiahString.replace(/[^\d]/g, '')
  }
  // Update formatted values when raw values change
  watch(jumlahPembayaran, (newValue) => {
    formattedPembayaran.value = formatRupiahInput(newValue)
  })

  watch(spp, (newValue) => {
    // SPP is a plain text field, no need for Rupiah formatting
    formattedSPP.value = newValue
  })
  // Handle Rupiah input
  const handlePembayaranInput = (value) => {
    jumlahPembayaran.value = extractNumericValue(value)
  }
  const handleSPPInput = (value) => {
    // SPP is just a plain text field, no need for Rupiah formatting
    spp.value = value
    formattedSPP.value = value
  }

  // Form actions
  const clearForm = () => {
    namaSuplier.value = ''
    namaPerusahaan.value = ''
    jenisBank.value = 'Mandiri'
    noRekening.value = ''
    noPreorder.value = ''
    tanggalPengadaan.value = ''
    jenisPengadaanBarang.value = 'beras'
    kuantum.value = ''
    satuan.value = 'KG'

    // Keep just one empty row when clearing with the default satuan
    inData.value = [{ tanggal_in: '', kuantum_in: '', satuan: 'KG' }]

    jumlahPembayaran.value = ''
    spp.value = ''
    formattedPembayaran.value = ''
    formattedSPP.value = ''
  }
  // Validation functions
  const validateForm = () => {
    const errors = [];
    if (!namaSuplier.value || namaSuplier.value.trim() === '') {
      errors.push('The nama suplier field is required.');
    }
    if (!jenisBank.value || ['mandiri', 'bca', 'bri'].indexOf(jenisBank.value.toLowerCase()) === -1) {
      errors.push('The selected jenis bank is invalid.');
    }
    if (!noRekening.value || noRekening.value.trim() === '') {
      errors.push('The no rekening field is required.');
    }
    if (!noPreorder.value || noPreorder.value.trim() === '') {
      errors.push('The no preorder field is required.');
    }
    if (!tanggalPengadaan.value || tanggalPengadaan.value.trim() === '') {
      errors.push('The tanggal pengadaan field is required.');
    }
    if (!jenisPengadaanBarang.value || jenisPengadaanBarang.value.trim() === '') {
      errors.push('The jenis pengadaan barang field is required.');
    }
    if (!kuantum.value || kuantum.value.trim() === '' || isNaN(parseFloat(kuantum.value))) {
      errors.push('The kuantum field must be a valid number.');
    }    if (!satuan.value || ['KG', 'Liter', 'PCS'].indexOf(satuan.value) === -1) {
      errors.push('The selected satuan is invalid.');
    }
    if (!spp.value || spp.value.trim() === '') {
      errors.push('The SPP field is required.');
    }
    if (!jumlahPembayaran.value || jumlahPembayaran.value.trim() === '' || isNaN(parseInt(jumlahPembayaran.value))) {
      errors.push('The jumlah pembayaran field is required and must be a number.');
    }
    // Check if any Data IN row has an empty tanggal_in (date) field
    const emptyDateFound = inData.value.some((item) => !item.tanggal_in);
    if (emptyDateFound) {
      errors.push('All Data IN dates must be filled.');
    }
    // Validate kuantum_in in Data IN rows
    const invalidKuantumIn = inData.value.some((item) => 
      item.kuantum_in && isNaN(parseFloat(item.kuantum_in))
    );
    if (invalidKuantumIn) {
      errors.push('All Data IN kuantum values must be valid numbers.');
    }
    if (errors.length > 0) {
      Swal.fire({
        title: 'Error',
        html: errors.join('<br>'),
        icon: 'error',
        confirmButtonColor: '#0099FF',
        confirmButtonText: 'OK',
      });
      return false;
    }
    return true;
  }

  // Function to add a new row to inData
  const addDataInRow = () => {
    if (inData.value.length >= 10) {
      // Show SweetAlert notification
      Swal.fire({
        title: 'Batas Maksimum',
        text: `Maksimum Untuk Data IN hanya 10 baris`,
        icon: 'warning',
        confirmButtonColor: '#0099FF',
        confirmButtonText: 'Oke',
      })
      return // Exit the function without adding a row
    }

    // If under the limit, add a new row with the current satuan value
    inData.value.push({ tanggal_in: '', kuantum_in: '', satuan: satuan.value })
  }
  // Function to remove a row from inData
  const removeDataRow = (index) => {
    if (inData.value.length > 1) {
      inData.value.splice(index, 1)
    }
  }
  
  const isLoading = ref(false)
    // Save form data when the form emits save event
  const saveForm = async () => {
    // First validate the form
    if (!validateForm()) return

    // Set loading state
    isLoading.value = true

    try {
      // Ensure all inData entries have the same satuan as the main form
      const normalizedInData = inData.value.map(item => ({
        tanggal_in: item.tanggal_in || null,
        kuantum_in: item.kuantum_in || '0',
        satuan: satuan.value // Always use the main satuan value
      }));
      
      // Collect form data
      const formData = {
        nama_suplier: namaSuplier.value,
        nama_perusahaan: namaPerusahaan.value || '', // Optional field
        jenis_bank: jenisBank.value.toLowerCase(), // Ensure lowercase
        no_rekening: noRekening.value,
        no_preorder: noPreorder.value,
        tanggal_pengadaan: tanggalPengadaan.value,
        jenis_pengadaan_barang: jenisPengadaanBarang.value.toLowerCase(), // Ensure lowercase
        kuantum: kuantum.value,
        satuan: satuan.value, // New field matching database structure
        in_data: normalizedInData,
        jumlah_pembayaran: jumlahPembayaran.value,
        spp: spp.value,
      }      
      console.log('Submitting form data:', formData);
      
      // Validate in_data format before sending
      try {
        // Test if in_data can be properly serialized
        const testJson = JSON.stringify(formData.in_data);
        JSON.parse(testJson); // Verify it's valid JSON
      } catch (jsonError) {
        console.error('Invalid JSON for in_data:', jsonError);
        Swal.fire({
          title: 'Error',
          html: 'Data IN memiliki format yang tidak valid. Silakan periksa kembali input Anda.',
          icon: 'error',
          confirmButtonColor: '#0099FF',
          confirmButtonText: 'OK',
        });
        isLoading.value = false;
        return;
      }
      
      // Kirim data ke API
      const response = await PermohonanService.create(formData);
      console.log('API response:', response.data);
      
      // Show success message
      showSuccessNotification('Data permohonan berhasil disimpan', () => {
        router.push('/admin/lihatdata');
      });
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Handle validation errors from Laravel
      if (error.response && error.response.data && error.response.data.errors) {
        // Extract validation errors from Laravel response
        const validationErrors = error.response.data.errors;
        
        // Special handling for in_data errors
        if (validationErrors.in_data) {
          // If there's a JSON validation error with in_data
          Swal.fire({
            title: 'Error Data IN',
            html: 'Format data IN tidak valid. Pastikan semua field tanggal dan kuantum terisi dengan benar.',
            icon: 'error',
            confirmButtonColor: '#0099FF',
            confirmButtonText: 'OK',
          });
        } else {
          // Handle other validation errors
          const errorMessages = Object.values(validationErrors)
            .flat()
            .join('<br>');
          
          // Display validation errors
          Swal.fire({
            title: 'Validation Error',
            html: errorMessages,
            icon: 'error',
            confirmButtonColor: '#0099FF',
            confirmButtonText: 'OK',
          });
        }
      } else {
        // Use utility function for other API errors
        handleApiError(error, {
          fallbackMessage: 'Gagal menyimpan data permohonan',
        });
      }    } finally {
      isLoading.value = false;
    }
  }

  // Preview functionality - save form data to localStorage and navigate to preview
  const previewForm = () => {
    // First validate the form
    if (!validateForm()) return

    try {
      // Ensure all inData entries have the same satuan as the main form
      const normalizedInData = inData.value.map(item => ({
        tanggal_in: item.tanggal_in || null,
        kuantum_in: item.kuantum_in || '0',
        satuan: satuan.value
      }));

      // Create form data for preview with frontend field names
      const previewData = {
        namaSupplier: namaSuplier.value,
        namaPerusahaan: namaPerusahaan.value || '',
        jenisBank: jenisBank.value,
        noRekening: noRekening.value,
        noPreorder: noPreorder.value,
        tanggalPengadaan: tanggalPengadaan.value,
        jenisPengadaanBarang: jenisPengadaanBarang.value,
        kuantum: kuantum.value,
        satuan: satuan.value,
        inData: normalizedInData,
        jumlahPembayaran: jumlahPembayaran.value,
        spp: spp.value,
      };

      console.log('Saving preview data:', previewData);
      
      // Save to localStorage
      localStorage.setItem('permohonanFormData', JSON.stringify(previewData));
      
      // Navigate to preview page
      router.push('/admin/preview-permohonan');
    } catch (error) {
      console.error('Preview error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Gagal memproses data untuk preview',
        icon: 'error',
        confirmButtonColor: '#0099FF',
        confirmButtonText: 'OK',
      });
    }
  }
</script>

<template>
  <AdminLayout class="h-screen overflow-hidden">
    <!-- Add transition wrapper -->
    <transition name="page" appear>
      <div
        class="flex items-center justify-center min-h-[calc(80vh-120px)] py-6"
      >
        <!-- Side Navigation (unchanged) -->
        <div
          class="fixed left-8 lg:left-1/6 top-1/3 flex flex-col space-y-4 z-20"
        >
          <router-link
            to="/admin/dashboard"
            class="bg-[#0099FF] text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-[#0088EE] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </router-link>
          <router-link
            to="/admin/lihatdata"
            class="bg-[#0099FF] text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-[#0088EE] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </router-link>
        </div>

        <!-- Using our reusable component with v-model bindings -->        <FormComponent
          :namaSuplier="namaSuplier"
          @update:namaSuplier="namaSuplier = $event"
          :namaPerusahaan="namaPerusahaan"
          @update:namaPerusahaan="namaPerusahaan = $event"
          :jenisBank="jenisBank"
          @update:jenisBank="jenisBank = $event"
          :noRekening="noRekening"
          @update:noRekening="noRekening = $event"
          :noPreorder="noPreorder"
          @update:noPreorder="noPreorder = $event"
          :tanggalPengadaan="tanggalPengadaan"
          @update:tanggalPengadaan="tanggalPengadaan = $event"
          :jenisPengadaanBarang="jenisPengadaanBarang"
          @update:jenisPengadaanBarang="jenisPengadaanBarang = $event"
          :kuantum="kuantum"
          @update:kuantum="kuantum = $event"
          :satuan="satuan"
          @update:satuan="satuan = $event"
          :inData="inData"
          @update:inData="inData = $event"
          :jumlahPembayaran="jumlahPembayaran"
          @update:jumlahPembayaran="handlePembayaranInput($event)"
          :spp="spp"
          @update:spp="handleSPPInput($event)"
          :formattedPembayaran="formattedPembayaran"
          :formattedSPP="formattedSPP"
          :isLoading="isLoading"          @add-data-row="addDataInRow"
          @remove-data-row="removeDataRow"
          @clear-form="clearForm"
          @save-form="saveForm"
          @preview-form="previewForm"
        />
      </div>
    </transition>
  </AdminLayout>
</template>

<style scoped>
  /* Page transition animations */
  .page-enter-active,
  .page-leave-active {
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  .page-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }

  .page-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }

  /* Remove dropdown arrow from select elements */
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: none !important;
  }

  select::-ms-expand {
    display: none;
  }
</style>
