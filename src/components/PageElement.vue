<script setup>
  import { ref } from 'vue'
  const noIndex = ref([
    {
      nomor: 1,
    },
    {
      nomor: 2,
    },
    {
      nomor: 3,
    },
    {
      nomor: 4,
    },
    {
      nomor: 5,
    },
  ])
</script>

<template>
  <section class="flex justify-center items-center gap-2">
    <!-- < -->
    <button class="font-poppins bg-[#EAE9EF] text-[#ADB5BD] rounded-sm w-8 h-8">
      <
    </button>

    <!-- V-FOR -->
    <div
      v-for="(no, index) in noIndex"
      :key="index"
      class="fon-medium border border-[#CED4DA] text-sm hover:border-[#006aff] hover:text-[#006aff] rounded-sm w-8 h-8 flex justify-center items-center"
    >
      {{ no.nomor }}
    </div>

    <!-- > -->
    <button
      class="font-poppins border border-[#CED4DA] rounded-sm w-8 h-8 hover:bg-[#006aff] hover:border-0 hover:text-white"
    >
      >
    </button>

    <div class="flex text-sm gap-3 items-center">
      <input
        type=""
        class="border border-[#CED4DA] rounded-sm w-30 h-8 px-4 focus:outline-[#006aff] focus:text-[#006aff] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <div>/Page</div>
    </div>
  </section>
</template>
