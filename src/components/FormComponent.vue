<script setup>
import { defineProps, defineEmits } from 'vue'

// Define props with default values
const props = defineProps({
  // Form data properties
  namaSuplier: { type: String, default: '' },
  namaPerusahaan: { type: String, default: '' },
  jenisBank: { type: String, default: 'mandiri' },
  noRekening: { type: String, default: '' },
  noPreorder: { type: String, default: '' },
  tanggalPengadaan: { type: String, default: '' },
  jenisPengadaanBarang: { type: String, default: 'beras' },
  kuantum: { type: String, default: '' },
  satuan: { type: String, default: 'KG' },
  inData: { type: Array, default: () => [{ tanggal_in: '', kuantum_in: '', satuan: 'KG' }] },
  jumlahPembayaran: { type: String, default: '' },
  spp: { type: String, default: '' },
    // UI configuration
  layoutType: { type: String, default: 'admin' },
  showNavigation: { type: Boolean, default: true },
  formattedPembayaran: { type: String, default: '' },
  formattedSPP: { type: String, default: '' },
  isLoading: { type: Boolean, default: false }
})

// Define emits for all form interactions
const emit = defineEmits([
  'update:namaSuplier',
  'update:namaPerusahaan',
  'update:jenisBank',
  'update:noRekening',
  'update:noPreorder',
  'update:tanggalPengadaan', 
  'update:jenisPengadaanBarang',
  'update:kuantum',
  'update:satuan',
  'update:inData',
  'update:jumlahPembayaran',
  'update:spp',
  'add-data-row',
  'remove-data-row',
  'clear-form',
  'save-form',
  'preview-form'
])

// Helper methods for UI formatting (these are UI-specific, so can stay in the component)
const formatRupiah = (value) => {
  if (!value) return '';
  return 'Rp ' + value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Create a safe method to update dataIN array without reactivity issues
const updateDataIN = (index, field, value) => {
  // Create a deep copy of the array to ensure Vue tracks the changes properly
  const updatedDataIN = JSON.parse(JSON.stringify(props.inData));
  // Update the specific field in the specific row
  updatedDataIN[index][field] = value;
  // Emit the updated array
  emit('update:inData', updatedDataIN);
}
</script>

<template>  <div class="w-full max-w-5xl mx-auto px-4">
    <div class="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-auto max-h-[80vh] border border-gray-100 form-card">      <!-- Form Header -->
      <div class="text-center pb-2 bg-white z-10">
        <h2 class="text-xl font-medium mt-10 mb-1 form-title" style="color: #0099FF;">Form Input Data</h2>
        <div class="mx-auto form-divider" style="height: 3px; background-color: #0099FF; width: 100%; max-width: 200px; margin-bottom: 20px;"></div>
      </div>
      
      <!-- Show loading overlay when data is being loaded or saved -->
      <div v-if="isLoading" 
           class="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
        <div class="p-4 bg-white rounded-lg shadow-lg text-center">
          <div class="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p class="text-gray-700 font-medium">Memproses data...</p>
        </div>
      </div>
      
      <!-- Scrollable Form Content -->
      <div class="overflow-y-auto flex-grow">
        <div class="p-6">
          <!-- Data Pemohon Section -->
          <div class="mb-8 form-section">
            <h3 class="font-medium text-lg mb-4">Data Pemohon</h3>
            
            <div class="space-y-3">
              <div class="flex flex-row items-center">
                <label class="block text-gray-700 w-1/4">Nama Supplier</label>
                <input
                  type="text"
                  :value="namaSuplier"
                  @input="emit('update:namaSuplier', $event.target.value)"
                  class="w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                  placeholder="Masukan Nama Supplier"
                />
              </div>
              
              <div class="flex flex-row items-center">
                <label class="block text-gray-700 w-1/4">Nama Perusahaan</label>
                <input
                  type="text"
                  :value="namaPerusahaan"
                  @input="emit('update:namaPerusahaan', $event.target.value)"
                  class="w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                  placeholder="Masukan Nama Perusahaan"
                />
              </div>
                <div class="flex flex-row items-center">
                <label class="block text-gray-700 w-1/4">Bank</label>
                <select
                  :value="jenisBank"
                  @change="emit('update:jenisBank', $event.target.value)"
                  class="w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                >
                  <option value="Mandiri">Mandiri</option>
                  <option value="BNI">BNI</option>
                  <option value="BRI">BRI</option>
                  <option value="BCA">BCA</option>
                  <option value="BTPN">BTPN</option>
                  <option value="CIMB">CIMB</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
                <div class="flex flex-row items-center">
                <label class="block text-gray-700 w-1/4">No. Rekening</label>
                <input
                  type="text"
                  :value="noRekening"
                  @input="emit('update:noRekening', $event.target.value)"
                  class="w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                  placeholder="Masukan Nomor Rekening"
                />
              </div>
            </div>
          </div>          <!-- Detail Purchasing Order Section -->
          <div class="mb-8 form-section">
            <h3 class="font-medium text-lg mb-4">Detail Purchasing Order</h3>
            
            <div class="space-y-3">              <div class="flex flex-row items-center">
                <label class="block text-gray-700 w-1/4">No. PO</label>
                <input
                  type="text"
                  :value="noPreorder"
                  @input="emit('update:noPreorder', $event.target.value)"
                  class="w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                  placeholder="Masukan Nomor PO"
                />
              </div>
                <div class="flex flex-row items-center">
                <label class="block text-gray-700 w-1/4">Tanggal</label>
                <input
                  type="date"
                  :value="tanggalPengadaan"
                  @input="emit('update:tanggalPengadaan', $event.target.value)"
                  class="w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                />
              </div>
                <div class="flex flex-row items-center">
                <label class="block text-gray-700 w-1/4">Jenis Pengadaan</label>
                <select
                  :value="jenisPengadaanBarang"
                  @change="emit('update:jenisPengadaanBarang', $event.target.value)"
                  class="w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                >
                  <option value="Beras">Beras</option>
                  <option value="Tepung">Tepung</option>
                  <option value="Gula">Gula</option>
                  <option value="Minyak Goreng">Minyak Goreng</option>
                  <option value="CPO">CPO</option>
                  <option value="Daging">Daging</option>
                  <option value="Telur">Telur</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              
              <div class="flex flex-row items-center">
                <label class="block text-gray-700 w-1/4">Kuantum</label>
                <div class="relative w-3/4 flex">                  <input
                    type="number"
                    :value="kuantum"
                    @input="emit('update:kuantum', $event.target.value)"
                    class="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                    placeholder="0"
                    min="0"
                  /><select
                    :value="satuan"
                    @change="emit('update:satuan', $event.target.value)"
                    class="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-white text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                  >
                    <option value="KG">KG</option>
                    <option value="TON">TON</option>
                    <option value="LITER">LITER</option>
                  </select>
                </div>
              </div>
            </div>
          </div>          <!-- Data IN Section -->
          <div class="mb-8 form-section">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-medium text-lg">Data IN</h3>
              <button
                @click="emit('add-data-row')"
                class="px-3 py-1 bg-[#0099FF]/10 text-[#0099FF] hover:bg-[#0099FF]/20 rounded-md transition-colors focus:outline-none flex items-center"
                :disabled="inData.length >= 10"
                :class="{ 'opacity-50 cursor-not-allowed': inData.length >= 10 }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Baris
              </button>
            </div>

            <div class="space-y-3">
              <div v-for="(item, index) in inData" :key="index" class="flex flex-row space-x-3">
                <div class="flex-none w-10 h-10 bg-white rounded-md flex items-center justify-center border border-gray-300">
                  <span>{{ index + 1 }}</span>
                </div>
                <div class="flex-1">
                  <input
                    type="date"
                    :value="item.tanggal_in"
                    @input="(e) => updateDataIN(index, 'tanggal_in', e.target.value)"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                  />
                </div>
                <div class="flex-1 flex items-center">
                  <input
                    type="number"
                    :value="item.kuantum_in"
                    @input="(e) => updateDataIN(index, 'kuantum_in', e.target.value)"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                    placeholder="0"
                    min="0"
                  />
                  <span class="ml-2 text-gray-700">{{ item.satuan }}</span>
                </div>
                
                <!-- Delete button -->
                <button 
                  @click="emit('remove-data-row', index)"
                  class="text-red-500 hover:text-red-700"
                  type="button"
                  title="Hapus baris"
                  :disabled="inData.length <= 1"
                  :class="{ 'opacity-50 cursor-not-allowed': inData.length <= 1 }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>          <!-- Data Pembayaran Section -->
          <div class="mb-8 form-section">
            <h3 class="font-medium text-lg mb-4">Data Pembayaran</h3>
            
            <div class="space-y-3">              <div class="flex flex-row items-center">
                <label class="block text-gray-700 w-1/4">Total Jumlah</label>
                <div class="relative w-3/4">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    Rp
                  </span>
                  <input
                    type="text"
                    :value="formattedPembayaran.replace('Rp ', '')"
                    @input="emit('update:jumlahPembayaran', $event.target.value)"
                    class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                    placeholder="0"
                  />
                </div>
              </div>
                <div class="flex flex-row items-center">
                <label class="block text-gray-700 w-1/4">No. SPP</label>
                <input
                  type="text"
                  :value="spp"
                  @input="emit('update:spp', $event.target.value)"
                  class="w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0099FF]"
                  placeholder="Masukan Nomor SPP"
                />
              </div>
            </div>
          </div>
        </div>
      </div>      <!-- Form Controls -->
      <div class="bg-gray-50 px-6 py-4 flex flex-row-reverse space-x-4 space-x-reverse border-t border-gray-200 sticky bottom-0">
        <button 
          @click="emit('save-form')"
          class="px-4 py-2 bg-[#0099FF] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors"
          :disabled="props.isLoading"
        >
          <span v-if="props.isLoading" class="inline-block mr-2">
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {{ props.isLoading ? 'Menyimpan...' : 'Simpan' }}
        </button>
        <button 
          @click="emit('clear-form')"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors"
          :disabled="props.isLoading"
        >
          Reset
        </button>
        <button 
          @click="emit('preview-form')"
          class="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-colors"
          :disabled="props.isLoading"
        >
          Preview
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
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

/* Form card animations */
.form-card {
  animation: shadowGrow 0.5s ease forwards;
}

/* Title animations */
.form-title {
  animation: fadeSlideDown 0.6s ease forwards;
  opacity: 0;
  transform: translateY(-10px);
}

.form-divider {
  animation: growFromCenter 0.8s ease forwards;
  transform-origin: center;
  transform: scaleX(0);
  opacity: 0;
}

/* Form section styling */
.form-section {
  position: relative;
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
  transform: translateY(15px);
}

.form-section::before {
  content: '';
  position: absolute;
  left: -24px;
  top: 8px;
  bottom: 8px;
  width: 3px;
  background-color: #0099FF;
  opacity: 0.3;
  border-radius: 3px;
}

.form-section:nth-child(1) {
  animation-delay: 0.3s;
}

.form-section:nth-child(2) {
  animation-delay: 0.5s;
}

.form-section:nth-child(3) {
  animation-delay: 0.7s;
}

.form-section:nth-child(4) {
  animation-delay: 0.9s;
}

/* Button animations */
.form-button {
  animation: fadeIn 0.4s ease forwards;
  animation-delay: 1.1s;
  opacity: 0;
}

/* Disabled button styling */
.form-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Keyframes */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shadowGrow {
  from {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
  }
  to {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
}

@keyframes fadeSlideDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes growFromCenter {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}
</style>
