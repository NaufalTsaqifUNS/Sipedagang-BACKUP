<script setup>
  import { ref } from 'vue'
  import SuperAdminLayout from '@/layouts/SuperAdminLayout.vue'
  import MainElement from '@/components/MainElement.vue'
  import RiwayatIconElement from '@/components/RiwayatIconElement.vue'
  import ArrowIconElement from '@/components/ArrowIconElement.vue'
  import FormElement from '@/components/FormElement.vue'
  import ButtonElement from '@/components/ButtonElement.vue'
  const iconHover = ref(false)
</script>

<template>
  <SuperAdminLayout>
    <MainElement>
      <section class="flex flex-col justify-between h-full">
        <!-- TITLE -->
        <div
          class="text-center font-semibold text-lg text-[#0099FF] underline underline-offset-8"
        >
          Edit Riwayat Data
        </div>

        <!-- NAV -->
        <div
          class="flex gap-2 items-center text-[#9BA1AA] text-sm font-poppins font-medium"
        >
          <div
            @mouseenter="iconHover = true"
            @mouseleave="iconHover = false"
            class="flex gap-2 justify-center items-center cursor-pointer"
          >
            <RiwayatIconElement
              :color="iconHover ? '#0099FF' : '#9BA1AA'"
              :innerColor="iconHover ? 'white' : 'white'"
            />
            <div
              :class="[
                'text-sm font-poppins font-medium',
                iconHover ? 'text-[#0099FF]' : 'text-[#9BA1AA]',
              ]"
            >
              Riwayat
            </div>
          </div>
          <div class="mt-0.5">
            <ArrowIconElement />
          </div>
          <div class="hover:text-[#0099FF] cursor-pointer">0032514578152</div>
          <div class="mt-0.5">
            <ArrowIconElement />
          </div>
          <div>Edit Data</div>
        </div>

        <!-- FORM -->
        <FormElement />

        <!-- BUTTON -->
        <ButtonElement />
      </section>
    </MainElement>
  </SuperAdminLayout>
</template>
