<script setup>
  import { ref, defineProps, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import SuperAdminLayout from '@/layouts/SuperAdminLayout.vue'
  import MainElement from '@/components/MainElement.vue'
  import StaffIconElement from '@/components/StaffIconElement.vue'
  import ArrowIconElement from '@/components/ArrowIconElement.vue'
  import StaffAddIconElement from '@/components/StaffAddIconElement.vue'
  import ButtonElement from '@/components/ButtonElement.vue'

  const props = defineProps(['id'])
  const iconHover = ref(false)

  const pageTitle = computed(() =>
    props.id ? 'Management Staff - Edit' : 'Management Staff - Tambah',
  )

  const showDeleteButton = computed(() => !!props.id)
  const photoUrl = ref('')

  const fileInputRef = ref(null)
  const router = useRouter()

  function onPhotoChange(e) {
    const file = e.target.files[0]
    if (file) {
      photoUrl.value = URL.createObjectURL(file)
    }
  }

  function triggerFileInput() {
    fileInputRef.value && fileInputRef.value.click()
  }
  function handleLeft() {
    router.back()
  }

  function handleRight() {
    // Handle the right button click
  }

  function handleDelete() {
    // Handle the delete button click
  }
</script>

<template>
  <SuperAdminLayout>
    <MainElement>
      <div class="flex flex-col h-full justify-between">
        <section>
          <!-- TITLE -->
          <div
            class="text-center font-semibold text-lg text-[#0099FF] underline underline-offset-8"
          >
            {{ pageTitle }}
          </div>

          <!-- NAV -->
          <div class="flex gap-2 items-center">
            <div
              @mouseenter="iconHover = true"
              @mouseleave="iconHover = false"
              class="flex gap-2 items-center cursor-pointer"
            >
              <StaffIconElement
                :color="iconHover ? '#0099FF' : '#9BA1AA'"
                :stroke="iconHover ? 'white' : 'white'"
              />
              <div
                :class="[
                  'text-sm font-poppins font-medium',
                  iconHover ? 'text-[#0099FF]' : 'text-[#9BA1AA]',
                ]"
              >
                Staff
              </div>
            </div>
            <div class="mt-0.5">
              <ArrowIconElement />
            </div>
            <div class="text-[#9BA1AA] text-sm font-poppins font-medium">
              Tambah Staff
            </div>
          </div>

          <!-- FORM -->
          <div class="mt-10">
            <div class="flex gap-16 w-full">
              <!-- FOTO -->
              <div class="flex flex-col items-center">
                <div class="relative w-36 h-36">
                  <div
                    class="absolute inset-0 bg-[#9BA1AA] rounded-full overflow-hidden"
                  >
                    <input
                      ref="fileInputRef"
                      type="file"
                      accept="image/*"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      @change="onPhotoChange"
                    />
                    <img
                      v-if="photoUrl"
                      :src="photoUrl"
                      alt="Foto Staff"
                      class="object-cover w-full h-full"
                    />
                    >
                  </div>
                  <StaffAddIconElement
                    @click="triggerFileInput"
                    class="absolute cursor-pointer overflow-visible top-20 left-27 z-20"
                  />
                </div>
                <div class="pt-3 w-full">Upload Your Photo</div>
              </div>

              <!-- INPUT -->
              <div
                class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-y-3 gap-x-10 w-full"
              >
                <!-- NAMA Staff -->
                <div class="flex flex-col gap-2.5">
                  <label for="nama-staff" class="font-medium">Nama Staff</label>
                  <input
                    type="text"
                    id="nama-staff"
                    placeholder="Masukkan Nama Staff"
                    class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full"
                  />
                </div>

                <!-- NO TELP -->
                <div class="flex flex-col gap-2.5">
                  <label for="no-telp" class="font-medium">No. Telp</label>
                  <input
                    type="number"
                    id="no-telp"
                    placeholder="08XX-XXXX-XXXX"
                    class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <!-- NAMA PENGGUNA -->
                <div class="flex flex-col gap-2.5">
                  <label for="nama-pengguna" class="font-medium"
                    >Nama Pengguna</label
                  >
                  <input
                    type="text"
                    id="nama-pengguna"
                    placeholder="Masukkan Nama Pengguna"
                    class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full"
                  />
                </div>

                <!-- PASSWORDD -->
                <div class="flex flex-col gap-2.5">
                  <label for="password" class="font-medium">Password</label>
                  <input
                    type="password"
                    id="password "
                    placeholder="Masukkan Password"
                    class="border-[2.2px] border-[#D9D9D9] rounded-lg h-11.5 px-7 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- BUTTON -->
        <section>
          <ButtonElement
            left-label="Back"
            :show-delete="showDeleteButton"
            :delete-label="'Hapus'"
            @onClickDelete="handleDelete"
            @onClickLeft="handleLeft"
            @onClickRight="handleRight"
          />
        </section>
      </div>
    </MainElement>
  </SuperAdminLayout>
</template>
