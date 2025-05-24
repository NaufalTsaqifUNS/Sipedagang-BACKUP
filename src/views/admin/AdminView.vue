<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
    <AdminLayout class="h-screen overflow-hidden">
        <transition name="page" appear>
            <div class="flex flex-col items-center justify-center h-[calc(100vh-120px)] px-4 overflow-hidden">
                <!-- Welcome Message -->
                <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mb-20 text-center font-inter">
                    Halo, Selamat Datang Ahmad Kaisar
                </h1>
                
                <!-- Dashboard Cards - with fixed dimensions -->
                <div class="flex flex-col md:flex-row gap-[73px] justify-center w-full">
                    
                    <!-- Form Input Data Card -->
                    <RouterLink to="/admin/form" class="block w-full md:w-auto">
                        <div class="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:scale-102 hover:shadow-lg cursor-pointer h-[469px] w-full md:w-[455px]">
                            <div class="h-[369px] overflow-hidden">
                                <img 
                                    src="@/assets/images/input-data.png" 
                                    alt="Form Input" 
                                    class="w-full h-full object-cover"
                                >
                            </div>
                            <div class="p-6 flex items-center justify-center h-[100px]">
                                <h3 class="text-xl md:text-2xl font-bold text-center font-inter">Form Input Data</h3>
                            </div>
                        </div>
                    </RouterLink>
                    
                    <!-- Rekap Data Card -->
                    <RouterLink to="/admin/lihatdata" class="block w-full md:w-auto">
                        <div class="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:scale-102 hover:shadow-lg cursor-pointer h-[469px] w-full md:w-[455px]">
                            <div class="h-[369px] overflow-hidden">
                                <img 
                                    src="@/assets/images/rekap-data.png" 
                                    alt="Rekap Data" 
                                    class="w-full h-full object-cover"
                                >
                            </div>
                            <div class="p-6 flex items-center justify-center h-[100px]">
                                <h3 class="text-xl md:text-2xl font-bold text-center font-inter">Rekap Data</h3>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </transition>
    </AdminLayout>
</template>

<style scoped>
.hover\:scale-102:hover {
  transform: scale(1.02);
}

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Card staggered animations */
.page-enter-active .flex > a:nth-child(1) {
  transition-delay: 0.2s;
}

.page-enter-active .flex > a:nth-child(2) {
  transition-delay: 0.4s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.flex > a {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.flex > a:nth-child(1) {
  animation-delay: 0.3s;
}

.flex > a:nth-child(2) {
  animation-delay: 0.5s;
}
</style>