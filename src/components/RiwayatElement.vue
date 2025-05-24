<script setup>
  defineProps({
    item: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <tr class="border-b border-[#E4E7EC]">
    <td class="px-4 py-4">{{ item.jenisPengadaan }}</td>
    <td class="px-4 py-4">{{ item.noPreorder }}</td>
    <td class="px-4 py-4">{{ item.supplier }}</td>
    <td class="px-4 py-4">{{ item.perusahaan }}</td>
    <td class="px-4 py-4">{{ item.admin }}</td>
    <td class="px-4 py-4">{{ item.kuantum }}</td>
    <td class="px-4 py-4">{{ item.tanggal }}</td>
    <td
      class="px-4 py-3 flex flex-wrap space-x-3.5 gap-y-1 text-sm text-center underline-offset-3 justify-center items-center"
    >
      <button class="text-[#2B79EF] underline">Preview</button>
      <button class="text-[#9BA1AA] underline">Edit</button>
      <button class="text-[#F44336] underline">Delete</button>
    </td>
  </tr>
</template>
