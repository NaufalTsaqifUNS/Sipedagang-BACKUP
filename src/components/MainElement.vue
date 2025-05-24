<script setup></script>

<template>
  <section class="realtive w-full h-[90.4dvh]">
    <div class="flex justify-center items-center w-full h-full">
      <div
        class="shadow-xl/40 outline-1 outline-gray-300 w-[160dvh] h-[83dvh] px-13 p-6 mt-1"
      >
        <div class="h-full">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
