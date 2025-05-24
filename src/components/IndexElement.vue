<script setup>
  defineProps({
    item: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <section
    class="flex outline-2 outline-[#F7F8FA] flex-col p-6 rounded-2xl h-36 shadow-xl/30"
  >
    <div>
      <div class="pt-1 font-bold text-3xl text-[#575757]">{{ item.title }}</div>
      <div class="mt-1 text-[#575757]">{{ item.desc }}</div>
    </div>
    <div class="flex justify-end -mt-4">
      <svg
        width="140"
        height="50"
        viewBox="0 0 146 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="33" y="19" width="14" height="37" rx="7" fill="#1B4F88" />
        <rect y="19" width="14" height="37" rx="7" fill="#1B4F88" />
        <rect x="65" width="15" height="56" rx="7.5" fill="#1B4F88" />
        <rect x="99" y="17" width="15" height="39" rx="7.5" fill="#1B4F88" />
        <rect x="132" width="14" height="56" rx="7" fill="#1B4F88" />
      </svg>
    </div>
  </section>
</template>
