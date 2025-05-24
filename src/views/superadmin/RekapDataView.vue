<script setup>
  import { ref } from 'vue'
  import SuperAdminLayout from '@/layouts/SuperAdminLayout.vue'
  import MainElement from '@/components/MainElement.vue'
  import PageElement from '@/components/PageElement.vue'
  import RekapDataElement from '@/components/RekapDataElement.vue'

  const rekap = ref([
    {
      kode: '001',
      nama: 'Rekap Data 1',
      tanggal: '2023-10-01',
      waktu: '2023-10-01 - 2023-10-31',
    },
    {
      kode: '002',
      nama: 'Rekap Data 2',
      tanggal: '2023-10-02',
      waktu: '2023-10-01 - 2023-10-31',
    },
    {
      kode: '003',
      nama: 'Rekap Data 3',
      tanggal: '2023-10-03',
      waktu: '2023-10-01 - 2023-10-31',
    },
    {
      kode: '004',
      nama: 'Rekap Data 4',
      tanggal: '2023-10-04',
      waktu: '2023-10-01 - 2023-10-31',
    },
    {
      kode: '005',
      nama: 'Rekap Data 5',
      tanggal: '2023-10-05',
      waktu: '2023-10-01 - 2023-10-31',
    },
    {
      kode: '006',
      nama: 'Rekap Data 6',
      tanggal: '2023-10-06',
      waktu: '2023-10-01 - 2023-10-31',
    },
    {
      kode: '007',
      nama: 'Rekap Data 7',
      tanggal: '2023-10-07',
      waktu: '2023-10-01 - 2023-10-31',
    },
    {
      kode: '008',
      nama: 'Rekap Data 8',
      tanggal: '2023-10-08',
      waktu: '2023-10-01 - 2023-10-31',
    },
    {
      kode: '009',
      nama: 'Rekap Data 9',
      tanggal: '2023-10-09',
      waktu: '2023-10-01 - 2023-10-31',
    },
    {
      kode: '010',
      nama: 'Rekap Data 10',
      tanggal: '2023-10-10',
      waktu: '2023-10-01 - 2023-10-31',
    },
  ])
</script>

<template>
  <SuperAdminLayout>
    <MainElement>
      <section class="flex flex-col justify-between h-full">
        <div class="flex flex-col h-full">
          <!-- ATAS -->
          <section class="grid grid-cols-3">
            <!-- TITLE -->
            <div
              class="font-semibold text-lg text-[#0099FF] underline underline-offset-8"
            >
              Rekap Data
            </div>

            <!-- NAV -->
            <div class="flex col-span-2 justify-end mt-1 gap-4">
              <input
                type="text"
                placeholder="Search"
                class="border border-[#D9D9D9] rounded-md h-8 px-5 text-sm focus:outline-[#0099ff]"
              />
              <input
                type="month"
                id="searchbar"
                placeholder="Search"
                class="border border-[#D9D9D9] rounded-md h-8 px-5 text-sm focus:outline-[#0099ff]"
              />
              <div
                class="flex bg-[#F0AB26] w-[9rem] h-8 font-bold text-white text-xs justify-center items-center rounded-md cursor-pointer"
              >
                Rekap Data
              </div>
            </div>
          </section>

          <!-- TABEL -->
          <section
            class="relative mt-7 text-sm overflow-x-auto overflow-y-auto overflow-hidden h-[60dvh] pr-1.5"
          >
            <table class="w-full overflow-hidden">
              <thead class="sticky top-0">
                <tr class="bg-[#F1F4F9] text-gray-700 text-sm text-center">
                  <th class="px-5 py-3 rounded-tl-xl">Kode</th>
                  <th class="px-4 py-3">Nama Rekap</th>
                  <th class="px-4 py-3">Tanggal Rekap</th>
                  <th class="px-4 py-3">Rentang Waktu</th>
                  <th class="px-4 py-3 rounded-tr-xl">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="rekap.length === 0">
                  <tr>
                    <td
                      colspan="8"
                      class="py-8 text-center text-[16px] text-gray-400"
                    >
                      Rekap data tidak ditemukan
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <RekapDataElement
                    v-for="(rekap, index) in rekap"
                    :key="index"
                    :rekap="rekap"
                    :class="[
                      index % 2 === 0 ? 'bg-[#FBFBFB]' : 'bg-[#FFFFFF]',
                      'text-center',
                    ]"
                  />
                </template>
              </tbody>
            </table>
          </section>
        </div>
      </section>
    </MainElement>
  </SuperAdminLayout>
</template>

<style scoped>
  table {
    border-collapse: collapse;
  }
</style>
