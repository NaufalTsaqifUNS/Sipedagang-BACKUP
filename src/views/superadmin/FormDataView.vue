<script setup>
  import { ref } from 'vue'
  import SuperAdminLayout from '@/layouts/SuperAdminLayout.vue'
  import MainElement from '@/components/MainElement.vue'
  import FormElement from '@/components/FormElement.vue'
  import InputIconElement from '@/components/InputIconElement.vue'
  import ArrowIconElement from '@/components/ArrowIconElement.vue'
  import ButtonElement from '@/components/ButtonElement.vue'
  const iconHover = ref(false)

  const formRef = ref(null)

  function handleClear() {
    if (formRef.value && formRef.value.clearForm) {
      formRef.value.clearForm()
    }
  }
</script>

<template>
  <SuperAdminLayout>
    <MainElement>
      <section class="flex flex-col justify-between h-full">
        <!-- TITLE -->
        <div
          class="text-center font-semibold text-lg text-[#0099FF] underline underline-offset-8"
        >
          Form Input Data
        </div>

        <!-- NAV -->
        <div class="flex gap-2 items-center">
          <div
            @mouseenter="iconHover = true"
            @mouseleave="iconHover = false"
            class="flex gap-2 items-center cursor-pointer"
          >
            <InputIconElement
              :color="iconHover ? '#0099FF' : '#9BA1AA'"
              :innerColor="iconHover ? 'white' : 'white'"
            />
            <div
              :class="[
                'text-sm font-poppins font-medium',
                iconHover ? 'text-[#0099FF]' : 'text-[#9BA1AA]',
              ]"
            >
              Input
            </div>
          </div>

          <div class="mt-0.5">
            <ArrowIconElement />
          </div>
          <div class="text-[#9BA1AA] text-sm font-poppins font-medium">
            Input Data
          </div>
        </div>

        <!-- FORM -->
        <FormElement ref="formRef" />

        <!-- BUTTON -->
        <ButtonElement @onClickLeft="handleClear" />
      </section>
    </MainElement>
  </SuperAdminLayout>
</template>
