<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import AdminLayout from '@/layouts/AdminLayout.vue'
  import EditFormComponent from '@/components/EditFormComponent.vue'
  import Swal from 'sweetalert2'
  import { PermohonanService } from '@/services'
  import { handleApiError } from '@/services/apiUtils'

  const router = useRouter()

  // Data Pemohon - Samakan dengan FormData.vue
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

  // Data Pembayaran
  const jumlahPembayaran = ref('')
  const spp = ref('')
  const formattedPembayaran = ref('')
  const formattedSPP = ref('') 
  
  // Store the original data identifier for finding the item to update later
  const originalIdentifier = ref({
    jenisPengadaanBarang: '', // Updated field name
    noPreorder: '', // Updated field name
    tanggal: '',
    formattedTanggal: '', // Store the formatted date for proper comparison
  })

  // Key for localStorage
  const dataKey = 'permohonanDataList'
  const formDataKey = 'permohonanFormData'
  const isLoading = ref(false)

  // Load data from localStorage on mount
  onMounted(() => {
    loadData()
  })

  const loadData = async () => {
    const storedData = localStorage.getItem(formDataKey)
    const permohonanId = localStorage.getItem('permohonanId')
    
    isLoading.value = true

    try {
      // Try to load from API if ID is available
      if (permohonanId) {
        try {
          const response = await PermohonanService.getById(permohonanId)
          
          // Map API response to form fields
          namaSuplier.value = response.data.nama_suplier || ''
          namaPerusahaan.value = response.data.nama_perusahaan || ''
          jenisBank.value = response.data.jenis_bank || 'Mandiri'
          noRekening.value = response.data.no_rekening || ''
          
          noPreorder.value = response.data.no_preorder || ''
          tanggalPengadaan.value = response.data.tanggal_pengadaan || ''
          jenisPengadaanBarang.value = response.data.jenis_pengadaan_barang || 'Beras'
          kuantum.value = response.data.kuantum || ''
          satuan.value = response.data.satuan || 'KG'
          
          // Handle inData with proper field format
          inData.value = Array.isArray(response.data.in_data) && response.data.in_data.length > 0
            ? response.data.in_data
            : [{ tanggal_in: '', kuantum_in: '', satuan: 'KG' }]
            jumlahPembayaran.value = response.data.jumlah_pembayaran || ''
          spp.value = response.data.spp || ''
          
          // Format currency display values for payment only
          formattedPembayaran.value = formatRupiah(jumlahPembayaran.value)
          // SPP is no longer formatted as currency
          
          // Store original identifier for updating the right item
          originalIdentifier.value = {
            jenisPengadaanBarang: response.data.jenis_pengadaan_barang || '',
            noPreorder: response.data.no_preorder || '',
            tanggal: response.data.tanggal_pengadaan || '',
            formattedTanggal: '',
          }
          
          // Calculate the formatted date for matching with displayed data
          if (response.data.tanggal_pengadaan) {
            const date = new Date(response.data.tanggal_pengadaan)
            const day = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()
            originalIdentifier.value.formattedTanggal = `${day}/${month}/${year}`
          }
          
          return
        } catch (error) {
          handleApiError(error, {
            fallbackMessage: 'Gagal memuat data dari server, menggunakan data lokal',
            showAlert: false
          })
          // Fall back to localStorage if API fails
        }
      }
        // Load from localStorage as fallback
      if (storedData) {
        const formData = JSON.parse(storedData)

        // Use the consistent field names
        namaSuplier.value = formData.namaSuplier || ''
        namaPerusahaan.value = formData.namaPerusahaan || ''
        jenisBank.value = formData.jenisBank || 'Mandiri'
        
        // Handle both field names for backward compatibility
        noRekening.value = formData.noRekening || formData.nomerRekening || ''
        noPreorder.value = formData.noPreorder || formData.nomerPO || ''
        tanggalPengadaan.value = formData.tanggalPengadaan || ''
        jenisPengadaanBarang.value = formData.jenisPengadaanBarang || formData.jenisPengadaan || 'Beras'
        
        kuantum.value = formData.kuantum || ''
        satuan.value = formData.satuan || 'KG'

        // Handle inData with the consistent structure
        if (Array.isArray(formData.inData) && formData.inData.length > 0) {
          inData.value = formData.inData.map(item => ({
            tanggal_in: item.tanggal_in || '',
            kuantum_in: item.kuantum_in || '',
            satuan: item.satuan || satuan.value
          }))
        } else {
          inData.value = [{ tanggal_in: '', kuantum_in: '', satuan: satuan.value }]
        }        // Data Pembayaran
        jumlahPembayaran.value = formData.jumlahPembayaran || ''
        spp.value = formData.spp || formData.jumlahSPP || ''

        // Format currency display values for payment only
        formattedPembayaran.value = formatRupiah(jumlahPembayaran.value)
        // SPP is no longer formatted as currency
        
        // Store original identifier for updating the right item
        originalIdentifier.value = {
          jenisPengadaanBarang: formData.jenisPengadaanBarang || formData.jenisPengadaan || '',
          noPreorder: formData.noPreorder || formData.nomerPO || '',
          tanggal: formData.tanggalPengadaan || '',
          formattedTanggal: '',
        }

        // Calculate the formatted date for matching with displayed data
        if (formData.tanggalPengadaan) {
          const date = new Date(formData.tanggalPengadaan)
          const day = date.getDate().toString().padStart(2, '0')
          const month = (date.getMonth() + 1).toString().padStart(2, '0')
          const year = date.getFullYear()
          originalIdentifier.value.formattedTanggal = `${day}/${month}/${year}`
        }
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      isLoading.value = false
    }
  }
  // Function for formatting currency
  const formatRupiah = (value) => {
    if (!value) return ''
    return 'Rp ' + value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  // Helper: extract numeric value from formatted string
  const extractNumericValue = (rupiahString) => {
    if (!rupiahString) return ''
    return rupiahString.replace(/[^\d]/g, '')
  }

  // Handler for input pembayaran
  const handleJumlahPembayaranInput = (value) => {
    jumlahPembayaran.value = extractNumericValue(value)
    formattedPembayaran.value = formatRupiah(jumlahPembayaran.value)
  }
  const handleJumlahSPPInput = (value) => {
    // SPP is just a plain text field, no need for Rupiah formatting
    spp.value = value
    formattedSPP.value = value
  }
  // Watch for changes in the main satuan and update all inData rows
  const updateAllInDataSatuan = (newSatuan) => {
    satuan.value = newSatuan
    if (inData.value && inData.value.length > 0) {
      const updatedInData = inData.value.map((item) => ({
        ...item,
        satuan: newSatuan,
      }))
      inData.value = updatedInData
    }
  }

  // Handler for updating inData rows
  const updateInDataRow = (updatedInData) => {
    inData.value = updatedInData
  }

  // Maximum number of inData rows
  const maxDataInRows = 10

  // Add row to inData - renamed to match FormData.vue
  const addInDataRow = () => {
    if (inData.value.length < maxDataInRows) {
      // Always use the current satuan value for consistency
      inData.value.push({ tanggal_in: '', kuantum_in: '', satuan: satuan.value })
    } else {
      // Show SweetAlert notification when limit reached
      Swal.fire({
        title: 'Batas Maksimum',
        text: `Maksimum Untuk Data IN hanya ${maxDataInRows} baris`,
        icon: 'warning',
        confirmButtonColor: '#0099FF',
        confirmButtonText: 'Oke',
      })
    }
  }

  // Remove row from inData - renamed to match FormData.vue
  const removeInDataRow = (index) => {
    if (inData.value.length > 1) {
      inData.value.splice(index, 1)
    }
  }
  // Update currency formatted values
  const updateFormattedValues = () => {
    formattedPembayaran.value = formatRupiah(jumlahPembayaran.value)
    // SPP is no longer formatted as currency - it's a plain text field
    formattedSPP.value = spp.value
  }
  // Validation function to check if all required fields are filled
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
    }
    if (!satuan.value || ['KG', 'Liter', 'PCS'].indexOf(satuan.value) === -1) {
      errors.push('The selected satuan is invalid.');
    }
    if (!spp.value || spp.value.trim() === '') {
      errors.push('The spp field is required.');
    }
    if (!jumlahPembayaran.value || jumlahPembayaran.value.trim() === '') {
      errors.push('The jumlah pembayaran field is required.');
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
        title: 'Data Tidak Lengkap',
        text: errors.join('\n'),
        icon: 'warning',
        confirmButtonColor: '#0099FF',
        confirmButtonText: 'OK',
      });
      return false;
    }
    return true;
  }
  // Handler untuk event save dari EditFormComponent
  const handleSave = async () => {
    // Validate form first
    if (!validateForm()) {
      return
    }

    // Set loading state
    isLoading.value = true

    try {
      // Ensure all inData entries have the same satuan as the main form
      const normalizedInData = inData.value.map(item => ({
        tanggal_in: item.tanggal_in || null,
        kuantum_in: item.kuantum_in || '0',
        satuan: satuan.value // Always use the main satuan value
      }));

      // Build the complete form data with consistent field names
      const formData = {
        namaSuplier: namaSuplier.value,
        namaPerusahaan: namaPerusahaan.value,
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
      }

      // Prepare API data with snake_case field names
      const apiData = {
        nama_suplier: namaSuplier.value,
        nama_perusahaan: namaPerusahaan.value,
        jenis_bank: jenisBank.value,
        no_rekening: noRekening.value,
        no_preorder: noPreorder.value,
        tanggal_pengadaan: tanggalPengadaan.value,
        jenis_pengadaan_barang: jenisPengadaanBarang.value,
        kuantum: kuantum.value,
        satuan: satuan.value,
        in_data: normalizedInData,
        jumlah_pembayaran: jumlahPembayaran.value,
        spp: spp.value
      }

      // If we have a permohonanId, update via API
      const permohonanId = localStorage.getItem('permohonanId')
      if (permohonanId) {
        await PermohonanService.update(permohonanId, apiData)
      }

      // Format tanggal for display
      let tanggalFormatted = ''
      if (tanggalPengadaan.value) {
        const date = new Date(tanggalPengadaan.value)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        tanggalFormatted = `${day}/${month}/${year}`
      }      // Create entry for table display
      const displayEntry = {
        jenisPengadaan: jenisPengadaanBarang.value.toLowerCase(),
        noProorder: noPreorder.value,
        supplier: namaSuplier.value,
        perusahaan: namaPerusahaan.value,
        kuantum: `${kuantum.value} ${satuan.value}`,
        tanggal: tanggalFormatted,
        rawData: formData,
      }

      // Update or add the data in storage
      let savedDataList = []
      const savedDataString = localStorage.getItem(dataKey)

      if (savedDataString) {
        savedDataList = JSON.parse(savedDataString)
      }

      console.log('Original identifier:', originalIdentifier.value)
      console.log(
        'Formatted date to match:',
        originalIdentifier.value.formattedTanggal,
      )
      
      // Check if we need to update existing or add new
      const existingIndex = savedDataList.findIndex(
        (item) =>
          item.jenisPengadaan === originalIdentifier.value.jenisPengadaanBarang &&
          item.noProorder === originalIdentifier.value.noPreorder &&
          item.tanggal === originalIdentifier.value.formattedTanggal,
      )
      
      if (existingIndex !== -1) {
        // Update existing entry
        console.log('Found existing entry at index:', existingIndex)
        savedDataList[existingIndex] = displayEntry
      } else {
        // Add new entry
        console.log('No matching entry found, adding new entry')
        savedDataList.push(displayEntry)
      }
      
      // Save updated list back to localStorage
      localStorage.setItem(dataKey, JSON.stringify(savedDataList))
      
      // Show success message
      Swal.fire({
        title: 'Tersimpan!',
        text: 'Data berhasil diperbarui.',
        icon: 'success',
        confirmButtonColor: '#0099FF',
      }).then(() => {
        // Navigate back to the data list using the router object
        router.push('/admin/lihatdata')
      })
    } catch (error) {
      handleApiError(error, {
        fallbackMessage: 'Gagal menyimpan data ke server'
      })
    } finally {
      isLoading.value = false
    }
  }

  // Handler untuk event cancel dari EditFormComponent
  const handleCancel = () => {
    // Navigate back to the dashboard
    router.push('/admin/dashboard')
  }
  // Handler to clear form data
  const handleClear = () => {
    // Confirm via SweetAlert
    Swal.fire({
      title: 'Reset Form?',
      text: 'Semua data yang sudah diisi akan hilang.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Reset',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear all form fields
        namaSuplier.value = ''
        namaPerusahaan.value = ''
        jenisBank.value = 'mandiri'
        noRekening.value = ''
        noPreorder.value = ''
        tanggalPengadaan.value = ''
        jenisPengadaanBarang.value = 'beras'
        kuantum.value = ''
        satuan.value = 'KG'        
        inData.value = [{ tanggal_in: '', kuantum_in: '', satuan: 'KG' }]
        jumlahPembayaran.value = ''
        spp.value = ''
        formattedPembayaran.value = ''
        // formattedSPP is no longer used
        
        Swal.fire(
          'Reset Berhasil',
          'Form telah dikosongkan',
          'success'
        )
      }
    })
  }
  // Handler for preview event
  const handlePreview = () => {
    if (!validateForm()) return
    // Build the preview data with correct API-compatible field names
    const previewData = {
      namaSuplier: namaSuplier.value,
      namaPerusahaan: namaPerusahaan.value,
      jenisBank: jenisBank.value,
      noRekening: noRekening.value,
      noPreorder: noPreorder.value,
      tanggalPengadaan: tanggalPengadaan.value,
      jenisPengadaanBarang: jenisPengadaanBarang.value,
      kuantum: kuantum.value, // string/number only
      satuan: satuan.value,
      inData: inData.value.map(item => ({
        tanggal_in: item.tanggal_in,
        kuantum_in: item.kuantum_in,
        satuan: item.satuan || satuan.value
      })),
      jumlahPembayaran: jumlahPembayaran.value,
      spp: spp.value,
    }
    localStorage.setItem(formDataKey, JSON.stringify(previewData))
    router.push('/admin/preview-permohonan')
  }
</script>

<template>
  <AdminLayout class="h-screen overflow-auto bg-gray-50">
    <!-- Add page transition wrapper -->
    <transition name="page" appear>
      <div class="p-4 sm:p-6 font-inter">        <!-- Using our reusable presentational component -->
        <EditFormComponent
          :namaSupplier="namaSuplier"
          :namaPerusahaan="namaPerusahaan"
          :jenisBank="jenisBank"
          :noRekening="noRekening"
          :noPreorder="noPreorder"
          :tanggalPengadaan="tanggalPengadaan"
          :jenisPengadaanBarang="jenisPengadaanBarang"
          :kuantum="kuantum"
          :satuan="satuan"
          :inData="inData"
          :jumlahPembayaran="jumlahPembayaran"
          :spp="spp"
          :formattedPembayaran="formattedPembayaran"
          :formattedSPP="formattedSPP"
          :isLoading="isLoading"
          mode="edit"
          @update:namaSupplier="namaSuplier = $event"
          @update:namaPerusahaan="namaPerusahaan = $event"
          @update:jenisBank="jenisBank = $event"
          @update:noRekening="noRekening = $event"
          @update:noPreorder="noPreorder = $event"
          @update:tanggalPengadaan="tanggalPengadaan = $event"
          @update:jenisPengadaanBarang="jenisPengadaanBarang = $event"
          @update:kuantum="kuantum = $event"
          @update:satuan="(val) => updateAllInDataSatuan(val)"
          @update:inData="updateInDataRow"
          @update:jumlahPembayaran="handleJumlahPembayaranInput"
          @update:spp="handleJumlahSPPInput"
          @add-in-data-row="addInDataRow"
          @remove-in-data-row="removeInDataRow"
          @save="handleSave"
          @cancel="handleCancel"
          @clear="handleClear"
          @preview="handlePreview"
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
</style>
