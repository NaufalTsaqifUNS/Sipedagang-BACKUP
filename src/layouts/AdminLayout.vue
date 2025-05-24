<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  // Track dropdown visibility
  const isProfileDropdownOpen = ref(false)

  // Toggle dropdown
  const toggleProfileDropdown = () => {
    isProfileDropdownOpen.value = !isProfileDropdownOpen.value
  }

  // Close dropdown when clicking outside
  const closeDropdown = (event) => {
    const profileElement = document.getElementById('profile-dropdown-container')
    if (profileElement && !profileElement.contains(event.target)) {
      isProfileDropdownOpen.value = false
    }
  }

  // Add and remove event listeners for clicking outside
  onMounted(() => {
    document.addEventListener('click', closeDropdown)
  })

  onUnmounted(() => {
    document.removeEventListener('click', closeDropdown)
  })
</script>

<template>
  <div class="min-h-screen w-full relative overflow-x-hidden">
    <!-- Top SVG Wave -->
    <div class="absolute top-0 left-0 right-0 z-0">
      <svg
        width="100%"
        height="173"
        preserveAspectRatio="none"
        viewBox="0 0 1514 173"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1514 142.27V173C1489.62 160.399 1440.3 100.191 1143.36 104.5C1019.81 104.5 997.051 54 868.084 48.5C744.537 44.679 620.989 71.4258 497.442 48.5C373.894 25.5742 63.9413 5.12171 0 0H93.2025C154.976 0 278.524 0 402.072 0C525.619 0 649.167 0 772.714 0C896.262 0 1019.81 0 1143.36 0C1266.9 0 1390.45 0 1452.23 0H1514V142.27Z"
          fill="#0099FF"
        />
      </svg>
    </div>

    <!-- Bottom Left SVG Wave -->
    <div class="absolute bottom-0 left-0 z-0 w-1/3 md:w-auto">
      <svg
        width="100%"
        height="105"
        preserveAspectRatio="none"
        viewBox="0 0 548 105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M548 105.271H499.5C476.5 108.5 434.546 88.9172 391.092 86.1614C347.637 83.6812 304.182 73.5796 260.728 57.596C217.273 41.8881 173.818 9.92093 130.364 2.20472C86.9092 -5.78706 43.4546 9.92093 21.7273 17.9127L0 25.9045V105.271H21.7273C43.4546 105.271 86.9092 105.271 130.364 105.271C173.818 105.271 217.273 105.271 260.728 105.271C304.182 105.271 347.637 105.271 391.092 105.271C434.546 105.271 478 104.776 499.5 105.271H521.455H548Z"
          fill="#F0AB26"
        />
      </svg>
    </div>

    <!-- Bottom Right SVG Wave -->
    <div class="absolute bottom-0 right-0 z-0 w-2/3 md:w-auto">
      <svg
        width="100%"
        height="157"
        preserveAspectRatio="none"
        viewBox="0 0 1051 157"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1051 157H0.602539C29.1097 153.456 59.8947 149.303 90.6797 144.537C170.706 132.148 250.733 115.63 330.76 103.241C410.786 90.8523 490.813 82.5923 570.84 90.8516C650.866 99.1108 730.893 123.889 810.92 111.5C890.947 99.1111 970.973 49.5551 1010.99 24.7773L1051 0V157Z"
          fill="#1B4F88"
        />
      </svg>
    </div>

    <!-- Header -->
    <header
      class="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-10 py-5 relative z-10"
    >
      <!-- Logo -->
      <div
        class="text-[32px] sm:text-[48px] font-bold font-poppins mb-4 sm:mb-0"
      >
        <span class="text-[#F0AB26]">Si</span
        ><span class="text-[#176BC7]">PEDAGANG</span>
      </div>

      <!-- User Profile -->
      <div class="flex items-center gap-3 sm:gap-5">
        <!-- Notification Icon -->
        <button
          type="button"
          aria-label="Notifications"
          class="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F0AB26] transition-colors shadow-sm"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="sm:w-6 sm:h-6"
          >
            <path
              d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
              fill="#F0AB26"
            />
          </svg>
        </button>
       <!-- User Avatar and Name with Dropdown -->
<div id="profile-dropdown-container" class="relative">
  <div 
    @click="toggleProfileDropdown" 
    class="flex items-center gap-2 sm:gap-3 cursor-pointer transition-opacity hover:opacity-90"
  >
    <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden">
      <img src="../assets/images/kaisar.jpg" alt="User Avatar" class="w-full h-full object-cover" />
    </div>
    <div class="text-white text-[16px] sm:text-[20px] font-medium font-poppins">Ahmad Kaisar</div>
  </div>
  
  <!-- Animated Dropdown Menu -->
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div v-if="isProfileDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 origin-top-right">
  <RouterLink
    to="/admin"
    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center gap-2"
  >
    <svg width="18" height="18" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_410_6997)">
        <path d="M19.0241 8.1427L15.7916 4.9102C15.6344 4.7584 15.4239 4.6744 15.2054 4.6763C14.9869 4.6782 14.7779 4.76584 14.6234 4.92035C14.4689 5.07485 14.3812 5.28386 14.3793 5.50236C14.3774 5.72086 14.4614 5.93136 14.6132 6.08853L17.8457 9.32103C17.9418 9.41897 18.0257 9.52808 18.0957 9.64603C18.0832 9.64603 18.0732 9.63936 18.0607 9.63936L4.99074 9.66603C4.76973 9.66603 4.55777 9.75383 4.40149 9.91011C4.24521 10.0664 4.15741 10.2783 4.15741 10.4994C4.15741 10.7204 4.24521 10.9323 4.40149 11.0886C4.55777 11.2449 4.76973 11.3327 4.99074 11.3327L18.0557 11.306C18.0791 11.306 18.0982 11.2944 18.1207 11.2927C18.0468 11.4337 17.9531 11.5633 17.8424 11.6777L14.6099 14.9102C14.5303 14.9871 14.4668 15.079 14.4232 15.1807C14.3795 15.2824 14.3565 15.3917 14.3555 15.5024C14.3546 15.613 14.3757 15.7227 14.4176 15.8252C14.4595 15.9276 14.5213 16.0206 14.5996 16.0989C14.6778 16.1771 14.7709 16.239 14.8733 16.2809C14.9757 16.3228 15.0854 16.3439 15.1961 16.3429C15.3067 16.3419 15.4161 16.319 15.5177 16.2753C15.6194 16.2316 15.7114 16.1681 15.7882 16.0885L19.0207 12.856C19.6456 12.2309 19.9967 11.3832 19.9967 10.4994C19.9967 9.61548 19.6456 8.76779 19.0207 8.1427H19.0241Z" fill="#9BA1AA"/>
        <path d="M5.83333 18.8333H4.16667C3.50363 18.8333 2.86774 18.5699 2.3989 18.1011C1.93006 17.6323 1.66667 16.9964 1.66667 16.3333V4.66667C1.66667 4.00363 1.93006 3.36774 2.3989 2.8989C2.86774 2.43006 3.50363 2.16667 4.16667 2.16667H5.83333C6.05435 2.16667 6.26631 2.07887 6.42259 1.92259C6.57887 1.76631 6.66667 1.55435 6.66667 1.33333C6.66667 1.11232 6.57887 0.900358 6.42259 0.744078C6.26631 0.587797 6.05435 0.5 5.83333 0.5H4.16667C3.062 0.501323 2.00296 0.940735 1.22185 1.72185C0.440735 2.50296 0.00132321 3.562 0 4.66667L0 16.3333C0.00132321 17.438 0.440735 18.497 1.22185 19.2782C2.00296 20.0593 3.062 20.4987 4.16667 20.5H5.83333C6.05435 20.5 6.26631 20.4122 6.42259 20.2559C6.57887 20.0996 6.66667 19.8877 6.66667 19.6667C6.66667 19.4457 6.57887 19.2337 6.42259 19.0774C6.26631 18.9211 6.05435 18.8333 5.83333 18.8333Z" fill="#9BA1AA"/>
      </g>
      <defs>
        <clipPath id="clip0_410_6997">
          <rect width="20" height="20" fill="white" transform="translate(0 0.5)"/>
        </clipPath>
      </defs>
    </svg>
    <span>Keluar Akun</span>
  </RouterLink>
</div>
  </Transition>
</div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="px-4 sm:px-6 md:px-10 relative z-10 pb-24">
      <slot></slot>
    </main>
  </div>
</template>
