<script setup>
  import { ref } from 'vue'
  import SuperAdminLayout from '@/layouts/SuperAdminLayout.vue'
  import MainElement from '@/components/MainElement.vue'
  import RiwayatElement from '@/components/RiwayatElement.vue'
  import PageElement from '@/components/PageElement.vue'

  const data = ref([
    {
      jenisPengadaan: 'Gabah',
      noPreorder: '1234/12/C1130/2025',
      supplier: 'Punakawan',
      perusahaan: 'Bulog',
      admin: 'Super Admin',
      kuantum: '500 Kg',
      tanggal: '12/01/2025',
    },
    {
      jenisPengadaan: 'Gabah',
      noPreorder: '1234/12/C1130/2025',
      supplier: 'Punakawan',
      perusahaan: 'Bulog',
      admin: 'Super Admin',
      kuantum: '500 Kg',
      tanggal: '12/01/2025',
    },
    {
      jenisPengadaan: 'Gabah',
      noPreorder: '1234/12/C1130/2025',
      supplier: 'Punakawan',
      perusahaan: 'Bulog',
      admin: 'Super Admin',
      kuantum: '500 Kg',
      tanggal: '12/01/2025',
    },
    {
      jenisPengadaan: 'Gabah',
      noPreorder: '1234/12/C1130/2025',
      supplier: 'Punakawan',
      perusahaan: 'Bulog',
      admin: 'Super Admin',
      kuantum: '500 Kg',
      tanggal: '12/01/2025',
    },
    {
      jenisPengadaan: 'Gabah',
      noPreorder: '1234/12/C1130/2025',
      supplier: 'Punakawan',
      perusahaan: 'Bulog',
      admin: 'Super Admin',
      kuantum: '500 Kg',
      tanggal: '12/01/2025',
    },
    {
      jenisPengadaan: 'Gabah',
      noPreorder: '1234/12/C1130/2025',
      supplier: 'Punakawan',
      perusahaan: 'Bulog',
      admin: 'Super Admin',
      kuantum: '500 Kg',
      tanggal: '12/01/2025',
    },
    {
      jenisPengadaan: 'Gabah',
      noPreorder: '1234/12/C1130/2025',
      supplier: 'Punakawan',
      perusahaan: 'Bulog',
      admin: 'Super Admin',
      kuantum: '500 Kg',
      tanggal: '12/01/2025',
    },
    {
      jenisPengadaan: 'Gabah',
      noPreorder: '1234/12/C1130/2025',
      supplier: 'Punakawan',
      perusahaan: 'Bulog',
      admin: 'Super Admin',
      kuantum: '500 Kg',
      tanggal: '12/01/2025',
    },
  ])
</script>

<template>
  <SuperAdminLayout>
    <MainElement>
      <section class="flex flex-col justify-between h-full">
        <div>
          <!-- ATAS -->
          <section class="grid grid-cols-2">
            <!-- TITLE -->
            <div
              class="font-semibold text-lg text-[#0099FF] underline underline-offset-8"
            >
              Riwayat Pengadaan
            </div>

            <!-- NAV -->
            <div class="flex justify-end mt-1 gap-4">
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
            </div>
          </section>

          <!-- TABEL -->
          <section
            class="relative mt-7 text-sm overflow-x-auto overflow-y-auto pr-1.5"
          >
            <table class="w-full overflow-hidden h-full">
              <thead class="sticky top-0">
                <tr class="bg-gray-100 text-gray-700 text-sm text-center">
                  <th class="px-5 py-3 rounded-tl-xl">Jenis Pengadaan</th>
                  <th class="px-4 py-3">No Preorder</th>
                  <th class="px-4 py-3">Supplier</th>
                  <th class="px-4 py-3">Perusahaan</th>
                  <th class="px-4 py-3">Admin</th>
                  <th class="px-4 py-3">Kuantum</th>
                  <th class="px-4 py-3">Tanggal</th>
                  <th class="px-4 py-3 rounded-tr-xl">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="data.length === 0">
                  <tr>
                    <td
                      colspan="8"
                      class="py-8 text-center text-[16px] text-gray-400"
                    >
                      Silahkan untuk menginputkan data terlebih dahulu
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <RiwayatElement
                    v-for="(item, index) in data"
                    :key="index"
                    :item="item"
                    :class="[
                      index % 2 === 0 ? 'bg-[#efefef]' : 'bg-[#f5f5f540]',
                      'text-center',
                    ]"
                  />
                </template>
              </tbody>
            </table>
          </section>
        </div>

        <!-- PAGE -->
        <div class="flex items-center justify-center mt-5">
          <PageElement />
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
