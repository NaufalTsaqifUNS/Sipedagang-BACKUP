<script setup>
  import AcceptedIconElement from './AcceptedIconElement.vue'
  import DeclineIconElement from './DeclineIconElement.vue'

  const props = defineProps({
    person: {
      type: Object,
      default: () => [],
    },
  })
</script>

<template>
  <div
    class="flex bg-[#F7F8FA] mt-1 mb-4 py-5 px-7 rounded-lg shadow-lg/25 h-27"
  >
    <div class="w-full flex items-center gap-4">
      <img
        :src="person.img"
        :alt="person.nama"
        loading="lazy"
        class="w-16 h-16 rounded-full"
      />
      <div class="flex flex-col justify-center">
        <div class="font-bold md:text-xl sm:text-sm">{{ person.nama }}</div>
        <p class="text-sm">{{ person.tempat }}</p>
      </div>
    </div>
    <div class="flex mb-1 items-end gap-6 w-28">
      <AcceptedIconElement
        class="cursor-pointer hover:scale-90 duration-200 ease-in-out"
      />
      <DeclineIconElement
        class="cursor-pointer hover:scale-90 duration-200 ease-in-out"
      />
    </div>
  </div>
</template>
