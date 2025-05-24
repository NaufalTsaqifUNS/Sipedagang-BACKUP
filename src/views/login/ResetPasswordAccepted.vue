<script setup>
import GuestLayout from '@/layouts/GuestLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false) 
const showConfirmPassword = ref(false)
const resetSuccess = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const handleResetPassword = async () => {
  // Clear previous error messages
  errorMessage.value = ''
  
  // Validate inputs
  if (!password.value || !confirmPassword.value) {
    errorMessage.value = 'Kata sandi baru dan konfirmasi kata sandi harus diisi'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Kata sandi dan konfirmasi kata sandi tidak cocok'
    return
  }
  
  if (password.value.length < 8) {
    errorMessage.value = 'Kata sandi harus minimal 8 karakter'
    return
  }
  
  isLoading.value = true
  
  try {
    // Here you would add your actual password reset logic
    console.log('Resetting password:', password.value)
    
    // Simulate API call with timeout
    setTimeout(() => {
      resetSuccess.value = true
      isLoading.value = false
    }, 1000)
  } catch (error) {
    errorMessage.value = 'Reset kata sandi gagal, silakan coba lagi'
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/admin')
}
</script>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}
</style>

<template>
  <GuestLayout>
    <div class="flex items-center justify-center min-h-screen px-4">
      <!-- Reset Password Card -->
      <div class="bg-white rounded-lg w-full max-w-md shadow-2xl p-8">
        <!-- Logo and Title -->
        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold">
            <span class="text-[#F0AB26]">Si</span><span class="text-[#176BC7]">PEDAGANG</span>
          </h1>
          <p class="text-gray-600 mt-3 text-sm">Buat kata sandi baru untuk akun Anda</p>
        </div>
        
        <!-- Reset Password Form -->
        <form v-if="!resetSuccess" @submit.prevent="handleResetPassword" class="space-y-4">
          <!-- Error message if any -->
          <div v-if="errorMessage" class="text-center bg-red-100 text-red-700 p-3 rounded text-sm">
            {{ errorMessage }}
          </div>
          
          <!-- New Password field with toggle visibility -->
          <div>
            <label for="password" class="block text-sm text-gray-700 mb-1">Kata Sandi Baru</label>
            <div class="relative">
              <input 
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
              />
              <button 
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <!-- Eye icon when password is hidden -->
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <!-- Crossed eye icon when password is visible -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">Kata sandi minimal 8 karakter</p>
          </div>
          
          <!-- Confirm Password field with toggle visibility -->
          <div>
            <label for="confirmPassword" class="block text-sm text-gray-700 mb-1">Konfirmasi Kata Sandi</label>
            <div class="relative">
              <input 
                id="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
              />
              <button 
                type="button"
                @click="toggleConfirmPasswordVisibility"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <!-- Eye icon when password is hidden -->
                <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <!-- Crossed eye icon when password is visible -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Reset Password Button -->
          <div class="mt-6">
            <button 
              type="submit" 
              class="w-full bg-[#176BC7] text-white py-2.5 rounded-full font-medium hover:bg-blue-600 transition-colors"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else>Atur Ulang Kata Sandi</span>
            </button>
          </div>
        </form>
        
        <!-- Success message after password reset -->
        <div v-else class="space-y-6 text-center">
          <div class="p-4 bg-green-50 text-green-700 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-medium mb-1">Kata Sandi Diperbarui!</h3>
            <p class="text-sm">Kata sandi Anda telah berhasil diubah.</p>
          </div>
          
          <button 
            @click="goToLogin"
            class="w-full bg-[#176BC7] text-white py-2.5 rounded-full font-medium hover:bg-blue-600 transition-colors"
          >
            Kembali ke Login
          </button>
        </div>
        
        <!-- Return to login link (only shown when form is displayed) -->
        <div v-if="!resetSuccess" class="mt-6 pt-4 text-center border-t border-gray-200">
          <button 
            @click="goToLogin"
            class="text-[#176BC7] hover:underline bg-gray-100 w-full py-3 rounded-md"
          >
            Kembali ke Halaman Login
          </button>
        </div>
      </div>
    </div>
  </GuestLayout>
</template>