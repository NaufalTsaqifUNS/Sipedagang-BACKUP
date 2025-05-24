<script setup>
  import { ref } from 'vue'
  import StaffResetCardElement from '@/components/StaffResetCardElement.vue'
  import Kaisar from '@/assets/images/misc/kaisar.jpg'

  const props = defineProps({
    show: {
      type: Boolean,
      required: true,
    },
  })
  const emit = defineEmits(['close'])

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
  ])
</script>

<template>
  <section
    v-if="show"
    class="absolute inset-y-[0rem] inset-x-[0rem] blur-none flex flex-cols justify-center items-center z-50"
  >
    <!-- BACKGROUND -->
    <div class="w-full h-full bg-black opacity-8 relative"></div>
    <div
      @click="$emit('close')"
      class="absolute inset-0 flex justify-center items-center"
    >
      <!-- CONTENT -->
      <div
        @click.stop
        class="realtive bg-white px-9 py-7 rounded-lg shadow-lg w-[50rem] h-[36rem]"
      >
        <!-- CLOSE BUTTON
        <div class="w-full flex justify-end">
          <button
            @click="$emit('close')"
            class="absolute font-semibold cursor-pointer -mr-1 bg-red-500 text-white p-1 px-3 rounded-md"
          >
            X
          </button>
        </div> -->

        <!-- TITLE -->
        <div
          class="text-center font-semibold text-lg text-[#0099FF] underline underline-offset-8"
        >
          Request Confirm Password
        </div>

        <!-- CARD -->
        <section
          class="mt-6 px-3 overflow-y-auto overflow-hidden h-[29.5rem] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-scrollbar:{display:none}]"
        >
          <StaffResetCardElement
            v-for="(person, index) in staff"
            :key="index"
            :person="person"
          />
        </section>
      </div>
    </div>
  </section>
</template>
