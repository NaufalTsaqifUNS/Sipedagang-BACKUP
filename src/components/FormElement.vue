<script setup>
  import { ref, watch } from 'vue'

  const namaSupplier = ref('')
  const namaPerusahaan = ref('')
  const jenisBank = ref('')
  const nomorRekening = ref('')
  const nomorPO = ref('')
  const tanggalPengadaan = ref('')
  const jenisPengadaan = ref('')
  const kuantum = ref('')
  const jumlahSPP = ref('')

  const rawValue = ref(0)
  const displayValue = ref('')

  function clearForm() {
    namaSupplier.value = ''
    namaPerusahaan.value = ''
    jenisBank.value = ''
    nomorRekening.value = ''
    nomorPO.value = ''
    tanggalPengadaan.value = ''
    jenisPengadaan.value = ''
    kuantum.value = ''
    displayValue.value = ''
    jumlahSPP.value = ''
    dataInList.value = [{ tanggal: '', jumlah: '' }]
  }

  const formatCurrency = (value) => {
    if (!value) return ''
    const num = parseInt(value.toString().replace(/[^\d]/g, ''), 10)
    if (isNaN(num)) {
      return ''
    }
    rawValue.value = num
    return 'Rp ' + num.toLocaleString('id-ID')
  }

  const handleInput = (e) => {
    const formatted = formatCurrency(e.target.value)
    displayValue.value = formatted
  }

  const formatOnBlur = () => {
    displayValue.value = formatCurrency(rawValue.value)
  }

  // DATA IN
  const maxDataIn = 10
  const dataInList = ref([{ tanggal: '', jumlah: '' }])

  // Tambah baris DATA IN jika baris terakhir sudah terisi dan belum sampai max
  const addDataInRow = (index) => {
    const last = dataInList.value[dataInList.value.length - 1]
    if (
      dataInList.value.length < maxDataIn &&
      index === dataInList.value.length - 1 &&
      (last.tanggal || last.jumlah)
    ) {
      dataInList.value.push({ tanggal: '', jumlah: '' })
    }
  }

  // Watcher: hapus semua baris kosong kecuali satu baris kosong di akhir
  watch(
    dataInList,
    (newList) => {
      // Hapus semua baris yang kosong (kecuali baris kosong terakhir)
      for (let i = newList.length - 2; i >= 0; i--) {
        if (!newList[i].tanggal && !newList[i].jumlah) {
          newList.splice(i, 1)
        }
      }
      // Jika semua baris terisi dan jumlah baris < max, tambahkan satu baris kosong di akhir
      const last = newList[newList.length - 1]
      if (newList.length < maxDataIn && (last.tanggal || last.jumlah)) {
        newList.push({ tanggal: '', jumlah: '' })
      }
      // Jika tidak ada baris, pastikan minimal satu baris kosong
      if (newList.length === 0) {
        newList.push({ tanggal: '', jumlah: '' })
      }
    },
    { deep: true },
  )

  defineExpose({ clearForm })
</script>

<template>
  <!-- FORM -->
  <section
    class="flex flex-col gap-4 mt-6 overflow-y-auto w-full h-full pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-scrollbar:{display:none}]"
  >
    <!-- DATA PEMOHON -->
    <div class="font-bold text-xl">Data Pemohon</div>

    <div class="flex flex-col gap-6">
      <!-- NAMA SUPPLIER -->
      <div class="flex items-center w-full">
        <label for="nama-supplier" class="min-w-45 font-medium"
          >Nama Supplier</label
        >
        <input
          type="text"
          id="nama-supplier"
          placeholder="Punakawan"
          class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full"
          v-model="namaSupplier"
        />
      </div>

      <!-- NAMA PERUSAHAAN -->
      <div class="flex items-center w-full">
        <label for="nama-perusahaan" class="min-w-45 font-medium"
          >Nama Perusahaan</label
        >
        <input
          type="text"
          id="nama-perusahaan"
          placeholder="UD. Ali Baba"
          class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full"
          v-model="namaPerusahaan"
        />
      </div>

      <!-- JENIS BANK -->
      <div class="flex items-center w-full">
        <label for="jenis-bank" class="min-w-45 font-medium">Jenis Bank</label>
        <input
          type="text"
          id="jenis-bank"
          placeholder="Mandiri"
          class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full"
          v-model="jenisBank"
        />
      </div>

      <!-- NO REKENING -->
      <div class="flex items-center w-full">
        <label for="nomor-rekening" class="min-w-45 font-medium"
          >Nomor Rekening</label
        >
        <input
          type="number"
          id="nomor-rekening"
          placeholder="1234567891011"
          class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          v-model="nomorRekening"
        />
      </div>
    </div>

    <!-- DETAIL PURCHASING ORDER -->
    <div class="font-bold text-xl mt-4">Detail Purchasing Order</div>

    <div class="flex flex-col gap-6">
      <!-- NOMOR PO -->
      <div class="flex items-center w-full">
        <label for="nomor-po" class="min-w-45 font-medium">Nomor PO</label>
        <input
          type="text"
          id="nomor-po"
          placeholder="1234/12/11C30/2024"
          class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full"
          v-model="nomorPO"
        />
      </div>

      <!-- TANGGAL PENGADAAN -->
      <div class="flex items-center w-full">
        <label for="tanggal-pengadaan" class="min-w-45 font-medium"
          >Tanggal Pengadaan</label
        >
        <input
          type="date"
          id="tanggal-pengadaan"
          class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full"
          v-model="tanggalPengadaan"
        />
      </div>

      <!-- JENIS PENGADAAN -->
      <div class="flex items-center w-full">
        <label for="jenis-pengadaan" class="min-w-45 font-medium"
          >Jenis Pengadaan</label
        >
        <input
          type="text"
          id="jenis-pengadaan"
          placeholder="Beras"
          class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full"
          v-model="jenisPengadaan"
        />
      </div>

      <!-- KUANTUM -->
      <div class="flex items-center w-full">
        <label for="kuantum" class="min-w-45 font-medium">Kuantum</label>
        <div class="relative w-full">
          <input
            type="number"
            id="kuantum"
            placeholder="2000"
            class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            v-model="kuantum"
          />
          <span
            class="absolute inset-y-0 right-4 flex items-center text-gray-500 border-l-1 border-[#D9D9D9] my-0.5 pl-4"
          >
            KG
          </span>
        </div>
      </div>
    </div>

    <!-- DATA IN -->
    <div class="font-bold text-xl mt-4">Data IN</div>
    <div class="flex flex-col gap-6">
      <div
        v-for="(row, idx) in dataInList"
        :key="idx"
        class="flex items-center w-full gap-x-5"
      >
        <!-- No (auto generate) -->
        <input
          type="number"
          :value="idx + 1"
          class="w-12 h-12 border-[2.2px] border-[#D9D9D9] rounded-lg text-center pl-3"
          readonly
        />
        <!-- Tanggal -->
        <input
          type="date"
          v-model="row.tanggal"
          class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full"
          @input="addDataInRow(idx)"
        />
        <!-- Jumlah -->
        <div class="relative w-full">
          <input
            type="number"
            v-model="row.jumlah"
            placeholder="2000"
            class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            @input="addDataInRow(idx)"
          />
          <span
            class="absolute inset-y-0 right-4 flex items-center text-gray-500 border-l-1 border-[#D9D9D9] my-0.5 pl-4"
          >
            KG
          </span>
        </div>
      </div>
      <div
        v-if="dataInList.length >= maxDataIn"
        class="text-gray-400 text-center"
      >
        Maksimal 10 baris Data IN.
      </div>
    </div>

    <!-- INFORMASI PEMBAYARAN -->
    <div class="font-bold text-xl mt-4">Informasi Pembayaran</div>

    <div class="flex flex-col gap-6">
      <!-- JUMLAH PEMBAYARAN -->
      <div class="flex items-center w-full">
        <label for="jumlah-pembayaran" class="min-w-45 font-medium"
          >Jumlah Pembayaran</label
        >
        <input
          type="text"
          id="jumlah-pembayaran"
          @input="handleInput"
          @blur="formatCurrency"
          placeholder="Rp 2.000.000"
          class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full"
          v-model="displayValue"
        />
      </div>

      <!-- JUMLAH SPP -->
      <div class="flex items-center w-full">
        <label for="jumlah-spp" class="min-w-45 font-medium">Jumlah SPP</label>
        <input
          type="number"
          id="jumlah-spp"
          placeholder="2000"
          class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          v-model="jumlahSPP"
        />
      </div>
    </div>
  </section>
</template>
