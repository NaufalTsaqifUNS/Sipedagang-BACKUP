<script setup>
  import { RouterLink, useRoute } from 'vue-router'
  import { reactive, ref } from 'vue'
  import Bulog from '@/assets/images/bulog.png'
  import Kaisar from '@/assets/images/misc/kaisar.jpg'
  import InputIconElement from '@/components/InputIconElement.vue'
  import RiwayatIconElement from '@/components/RiwayatIconElement.vue'
  import StaffIconElement from '@/components/StaffIconElement.vue'
  import RekapIconElement from '@/components/RekapIconElement.vue'
  import SignOutIconElement from '@/components/SignOutIconElement.vue'
  import NotifIconElement from '@/components/NotifIconElement.vue'
  import DashboardIconElement from '@/components/DashboardIconElement.vue'

  const isHovered = reactive({
    dashboard: false,
    input: false,
    riwayat: false,
    staff: false,
    rekap: false,
    signout: false,
  })

  const route = useRoute()
</script>

<template>
  <div class="flex">
    <!-- SIDEBAR -->
    <div
      class="flex w-72 h-screen py-14 px-5 justify-center shadow-xl outline-gray-200 outline-1"
    >
      <div class="flex flex-col gap-4 items-center justify-between">
        <div class="flex flex-col items-center">
          <!-- LOGO -->
          <img
            loading="lazy"
            :src="Bulog"
            alt="Bulog Logo"
            class="w-38 -ml-1"
          />

          <div class="flex flex-col gap-4">
            <!-- DASHBOARD -->
            <RouterLink
              to="/superadmin/dashboard"
              class="group flex px-7 w-55 h-12 mt-16 rounded-xl transition-all duration-300 ease-in-out"
              :class="[
                isHovered.dashboard || route.path === '/superadmin/dashboard'
                  ? 'scale-90 bg-[#0099FF] shadow-md/20'
                  : 'hover:scale-90 hover:bg-[#0099FF] hover:shadow-md/20',
              ]"
              @mouseenter="isHovered.dashboard = true"
              @mouseleave="isHovered.dashboard = false"
            >
              <div class="flex items-center gap-3">
                <DashboardIconElement
                  :color="
                    isHovered.dashboard ||
                    route.path === '/superadmin/dashboard'
                      ? '#ffff'
                      : '#9BA1AA'
                  "
                />
                <div
                  class="font-poppins font-medium text-[#9BA1AA] text-sm"
                  :class="
                    isHovered.dashboard ||
                    route.path === '/superadmin/dashboard'
                      ? 'text-white'
                      : 'group-hover:text-white'
                  "
                >
                  Dashboard
                </div>
              </div>
            </RouterLink>

            <!-- INPUT -->
            <RouterLink
              to="/superadmin/input"
              class="group flex px-7 w-55 h-12 rounded-xl transition-all duration-300 ease-in-out"
              :class="[
                isHovered.input || route.path === '/superadmin/input'
                  ? 'scale-90 bg-[#0099FF] shadow-md/20'
                  : 'hover:scale-90 hover:bg-[#0099FF] hover:shadow-md/20',
              ]"
              @mouseenter="isHovered.input = true"
              @mouseleave="isHovered.input = false"
            >
              <div class="flex items-center gap-3">
                <InputIconElement
                  :color="
                    isHovered.input || route.path === '/superadmin/input'
                      ? '#ffff'
                      : '#9BA1AA'
                  "
                  :innerColor="
                    isHovered.input || route.path === '/superadmin/input'
                      ? '#0099FF'
                      : '#ffff'
                  "
                />
                <div
                  class="font-poppins font-medium text-[#9BA1AA] text-sm"
                  :class="
                    isHovered.input || route.path === '/superadmin/input'
                      ? 'text-white'
                      : 'group-hover:text-white'
                  "
                >
                  Input
                </div>
              </div>
            </RouterLink>

            <!-- RIWAYAT -->
            <RouterLink
              to="/superadmin/riwayat"
              class="group flex px-7 w-55 h-12 rounded-xl transition-all duration-300 ease-in-out"
              :class="[
                isHovered.riwayat ||
                route.path === '/superadmin/riwayat' ||
                route.path.startsWith('/superadmin/riwayat-edit')
                  ? 'scale-90 bg-[#0099FF] shadow-md/20'
                  : 'hover:scale-90 hover:bg-[#0099FF] hover:shadow-md/20',
              ]"
              @mouseenter="isHovered.riwayat = true"
              @mouseleave="isHovered.riwayat = false"
            >
              <div class="flex items-center gap-3">
                <RiwayatIconElement
                  :color="
                    isHovered.riwayat ||
                    route.path === '/superadmin/riwayat' ||
                    route.path.startsWith('/superadmin/riwayat-edit')
                      ? '#ffff'
                      : '#9BA1AA'
                  "
                />
                <div
                  class="font-poppins font-medium text-[#9BA1AA] text-sm"
                  :class="
                    isHovered.riwayat ||
                    route.path === '/superadmin/riwayat' ||
                    route.path.startsWith('/superadmin/riwayat-edit')
                      ? 'text-white'
                      : 'group-hover:text-white'
                  "
                >
                  Riwayat
                </div>
              </div>
            </RouterLink>

            <!-- STAFF -->
            <RouterLink
              to="/superadmin/staff"
              class="group flex px-7 w-55 h-12 rounded-xl transition-all duration-300 ease-in-out"
              :class="[
                isHovered.staff ||
                route.path === '/superadmin/staff' ||
                route.path === '/superadmin/staff-add' ||
                route.path.startsWith('/superadmin/staff-edit')
                  ? 'scale-90 bg-[#0099FF] shadow-md/20'
                  : 'hover:scale-90 hover:bg-[#0099FF] hover:shadow-md/20',
              ]"
              @mouseenter="isHovered.staff = true"
              @mouseleave="isHovered.staff = false"
            >
              <div class="flex items-center gap-3">
                <StaffIconElement
                  :color="
                    isHovered.staff ||
                    route.path === '/superadmin/staff' ||
                    route.path === '/superadmin/staff-add' ||
                    route.path.startsWith('/staff-edit')
                      ? '#ffff'
                      : '#9BA1AA'
                  "
                  :stroke="
                    isHovered.staff ||
                    route.path === '/superadmin/staff' ||
                    route.path === '/superadmin/staff-add' ||
                    route.path.startsWith('/staff-edit')
                      ? '#0099FF'
                      : '#ffff'
                  "
                />
                <div
                  class="font-poppins font-medium text-[#9BA1AA] text-sm"
                  :class="
                    isHovered.staff ||
                    route.path === '/superadmin/staff' ||
                    route.path === '/superadmin/staff-add' ||
                    route.path.startsWith('/superadmin/staff-edit')
                      ? 'text-white'
                      : 'group-hover:text-white'
                  "
                >
                  Staff
                </div>
              </div>
            </RouterLink>

            <!-- REKAP DATA -->
            <RouterLink
              to="/superadmin/rekapdata"
              class="group flex px-7 w-55 h-12 rounded-xl transition-all duration-300 ease-in-out"
              :class="[
                isHovered.rekap || route.path === '/superadmin/rekapdata'
                  ? 'scale-90 bg-[#0099FF] shadow-md/20'
                  : 'hover:scale-90 hover:bg-[#0099FF] hover:shadow-md/20',
              ]"
              @mouseenter="isHovered.rekap = true"
              @mouseleave="isHovered.rekap = false"
            >
              <div class="flex items-center gap-3">
                <RekapIconElement
                  :color="
                    isHovered.rekap || route.path === '/superadmin/rekapdata'
                      ? '#ffff'
                      : '#9BA1AA'
                  "
                  :stroke="
                    isHovered.rekap || route.path === '/superadmin/rekapdata'
                      ? '#0099FF'
                      : '#ffff'
                  "
                />
                <div
                  class="font-poppins font-medium text-[#9BA1AA] text-sm"
                  :class="
                    isHovered.rekap || route.path === '/superadmin/rekapdata'
                      ? 'text-white'
                      : 'group-hover:text-white'
                  "
                >
                  Rekap Data
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <!-- LOGOUT -->
        <RouterLink
          to="/"
          class="group flex bottom-0 h-fit gap-3 items-center justify-center hover:scale-110 transition-all duration-300 ease-in-out"
          @mouseenter="isHovered.signout = true"
          @mouseleave="isHovered.signout = false"
        >
          <div
            class="text-hover font-poppins font-medium text-[#9BA1AA] group-hover:text-[#0099FF]"
          >
            Log out
          </div>
          <SignOutIconElement
            :color="isHovered.signout ? '#0099FF' : '#9BA1AA'"
          />
        </RouterLink>
      </div>
    </div>

    <!-- NAVBAR -->
    <div class="w-full h-full">
      <div>
        <div
          class="flex bg-[#0099FF] h-18 w-full items-center px-12 justify-end gap-5"
        >
          <NotifIconElement />
          <div class="-mr-2">
            <img
              loading="lazy"
              :src="Kaisar"
              alt="Profile Picture"
              class="w-11 h-11 rounded-full"
            />
          </div>
          <div class="font-poppins font-medium text-white">SuperAdmin</div>
        </div>
      </div>

      <!-- MAIN CONTENT -->
      <slot />
    </div>
  </div>
</template>
