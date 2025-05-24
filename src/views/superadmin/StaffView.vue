<script setup>
  import { ref } from 'vue'
  import SuperAdminLayout from '@/layouts/SuperAdminLayout.vue'
  import StaffElement from '@/components/StaffElement.vue'
  import MainElement from '../../components/MainElement.vue'
  import StaffResetElement from '@/components/StaffResetElement.vue'
  import Kaisar from '@/assets/images/misc/kaisar.jpg'

  const showPopup = ref(false)
  const staff = ref([
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
    {
      nama: 'Ahmad Kaisar',
      tempat: 'Gudang Selatan',
      img: Kaisar,
    },
  ])
</script>

<template>
  <SuperAdminLayout>
    <section class="relative">
      <MainElement
        :class="showPopup ? 'blur-[3px] pointer-events-none select-none' : ''"
      >
        <!-- ATAS -->
        <section class="grid grid-cols-2">
          <!-- TITLE -->
          <div
            class="font-semibold text-lg text-[#0099FF] underline underline-offset-8"
          >
            Management Staff
          </div>

          <!-- NAV -->
          <div class="flex justify-end items-center mt-1 gap-4">
            <input
              type="text"
              placeholder="Search"
              class="border border-[#D9D9D9] rounded-md h-8 px-5 text-sm focus:outline-[#0099ff]"
            />
            <div
              class="flex bg-[#164E8A] w-[9rem] h-9 font-bold text-white text-xs justify-center items-center rounded-md cursor-pointer"
              @click="showPopup = true"
            >
              Reset Password
            </div>
            <RouterLink
              to="/superadmin/staff-add"
              class="flex bg-[#4CAF50] w-[9rem] h-9 font-bold text-white text-xs justify-center items-center rounded-md"
            >
              Tambah Staff
            </RouterLink>
          </div>
        </section>

        <!-- STAFF -->
        <section
          class="mt-6 px-4 h-[67dvh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-scrollbar:{display:none}]"
        >
          <div class="flex flex-wrap gap-6 py-4">
            <StaffElement
              v-for="(person, index) in staff"
              :key="index"
              :person="person"
            />
          </div>
        </section>
      </MainElement>

      <!-- STAFF RESET POPAP -->
      <StaffResetElement :show="showPopup" @close="showPopup = false" />
    </section>
  </SuperAdminLayout>
</template>
