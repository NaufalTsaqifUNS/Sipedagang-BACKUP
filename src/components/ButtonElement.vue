<script setup>
  defineProps({
    leftLabel: {
      type: String,
      default: 'Clear',
    },
    rightLabel: {
      type: String,
      default: 'Save',
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
    deleteLabel: {
      type: String,
      default: 'Delete',
    },
  })
  const emit = defineEmits(['onClickLeft', 'onClickRight', 'onClickDelete'])
</script>

<template>
  <div class="flex justify-end gap-5 mt-7.5 w-full">
    <button
      v-if="showDelete"
      type="button"
      class="bg-[#F44336] text-white rounded-lg h-10 px-9 mr-2 font-semibold cursor-pointer"
      @click="$emit('onClickDelete')"
    >
      {{ deleteLabel }}
    </button>
    <button
      type="button"
      class="bg-[#9BA1AA] text-white rounded-lg h-10 px-11 font-semibold cursor-pointer"
      @click="$emit('onClickLeft')"
    >
      {{ leftLabel }}
    </button>
    <button
      type="button"
      class="bg-[#0099FF] text-white rounded-lg h-10 px-20 font-semibold cursor-pointer"
      @click="$emit('onClickRight')"
    >
      {{ rightLabel }}
    </button>
  </div>
</template>
