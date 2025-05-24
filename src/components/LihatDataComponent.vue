<script setup>
  import { defineProps, defineEmits } from 'vue'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    tableData: { type: Array, default: () => [] },
    searchQuery: { type: String, default: '' },
    selectedMonth: { type: String, default: '' },
    currentPage: { type: Number, default: 1 },
    itemsPerPage: { type: Number, default: 6 },
    pageInput: { type: Number, default: 1 },
    months: { type: Array, default: () => [] },
    filteredData: { type: Array, default: () => [] },
    paginatedData: { type: Array, default: () => [] },
    getTotalPages: { type: Number, default: 1 },
    isExtraSmallScreen: { type: Boolean, default: false },
    displayedPageNumbers: { type: Array, default: () => [] },
    userType: { type: String, default: 'admin' },
  })

  const emit = defineEmits([
    'back',
    'preview',
    'print',
    'edit',
    'delete',
    'update:searchQuery',
    'update:selectedMonth',
    'update:currentPage',
    'update:pageInput',
    'page-input-submit',
  ])

  const router = useRouter()

  // These functions prepare data and emit events before navigation occurs
  const goBack = () => {
    emit('back')
  }

  const previewItem = (item) => {
    emit('preview', item)
  }

  const printItem = (item) => {
    emit('print', item)
  }

  const editItem = (item) => {
    emit('edit', item)
  }

  const deleteItem = (item) => {
    emit('delete', item)
  }

  const resetFilters = () => {
    emit('update:searchQuery', '')
    emit('update:selectedMonth', '')
    emit('update:currentPage', 1)
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= props.getTotalPages) {
      emit('update:currentPage', page)
    }
  }

  const handlePageInput = () => {
    emit('page-input-submit')
  }

  // Navigation functions using router
  const navigateToDetail = (id) => {
    router.push({ name: 'DetailPage', params: { id } })
  }

  const navigateToEdit = (id) => {
    router.push({ name: 'EditPage', params: { id } })
  }

  const navigateToPrint = (id) => {
    router.push({ name: 'PrintPage', params: { id } })
  }
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
    <!-- Main Container with improved visual hierarchy and mobile optimizations -->
    <div
      class="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden flex flex-col h-auto max-h-[95vh] sm:max-h-[90vh] md:max-h-[80vh] border border-gray-100"
    >
      <!-- Header with blue background and improved styling -->
      <div
        class="bg-[#0099FF]/10 p-4 sm:p-6 border-b border-gray-200 rounded-t-lg"
      >
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <h2
            class="text-xl sm:text-2xl font-bold text-[#0099FF] mb-2 sm:mb-0 flex items-center"
          >
            <div class="p-2 rounded-lg bg-[#0099FF] text-white mr-3 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            {{ userType === 'admin' ? 'Lihat Data' : 'Rekap Data' }}
          </h2>
          <!-- Beautiful modern filtering controls with animations -->
          <div class="w-full sm:w-auto">
            <!-- Glass-morphism inspired layout for filters -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <!-- Enhanced search input with modern styling -->
              <div class="relative w-full group">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  :value="searchQuery"
                  placeholder="Cari data..."
                  class="pl-10 pr-10 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                  aria-label="Cari data"
                  @input="$emit('update:searchQuery', $event.target.value)"
                />
                <!-- Animated clear search button -->
                <button
                  v-if="searchQuery"
                  @click="$emit('update:searchQuery', '')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <div
                    class="bg-gray-100 hover:bg-red-100 rounded-full p-1 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </button>
              </div>

              <!-- Modern month dropdown with enhanced styling -->
              <div class="relative w-full group">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none group-focus-within:text-indigo-600 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <select
                  :value="selectedMonth"
                  class="pl-10 pr-10 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl appearance-none w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-700 shadow-sm transition-all duration-300 hover:shadow-md"
                  aria-label="Filter by month"
                  @change="$emit('update:selectedMonth', $event.target.value)"
                >
                  <option
                    v-for="month in months"
                    :key="month.value"
                    :value="month.value"
                  >
                    {{ month.label }}
                  </option>
                </select>
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                >
                  <div
                    class="bg-indigo-100 rounded-full p-1 text-indigo-600 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <!-- Modern filter badges and counts with animations -->
            <div
              v-if="searchQuery || selectedMonth"
              class="flex flex-wrap items-center mt-3 gap-2"
            >
              <div
                v-if="searchQuery"
                class="bg-[#0099FF]/10 text-[#0099FF] text-xs font-medium px-3 py-1.5 rounded-full flex items-center border border-[#0099FF]/30 shadow-sm animate-fadeIn"
              >
                <span>Pencarian: {{ searchQuery }}</span>
                <button
                  @click="$emit('update:searchQuery', '')"
                  class="ml-2 text-[#0099FF] hover:text-red-500 transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <div
                    class="bg-white/80 rounded-full p-0.5 hover:bg-red-100 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              <div
                v-if="selectedMonth"
                class="bg-[#0099FF]/10 text-[#0099FF] text-xs font-medium px-3 py-1.5 rounded-full flex items-center border border-[#0099FF]/30 shadow-sm animate-fadeIn"
              >
                <span
                  >Bulan:
                  {{
                    months.find((m) => m.value === selectedMonth)?.label
                  }}</span
                >
                <button
                  @click="$emit('update:selectedMonth', '')"
                  class="ml-2 text-purple-500 hover:text-red-500 transition-colors duration-200"
                  aria-label="Clear month filter"
                >
                  <div
                    class="bg-white/80 rounded-full p-0.5 hover:bg-red-100 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              <div
                class="text-xs font-medium text-gray-600 px-2 py-1 bg-gray-100/70 rounded-full border border-gray-200/50 shadow-sm"
              >
                <span class="font-bold text-indigo-700">{{
                  filteredData.length
                }}</span>
                hasil ditemukan
              </div>
              <!-- Modern reset all filters button -->
              <button
                @click="resetFilters"
                class="ml-auto text-xs font-medium text-white flex items-center bg-[#0099FF] hover:bg-[#0077CC] px-3 py-1.5 rounded-full shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5"
                aria-label="Reset all filters"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modern table design with glass-morphism style and enhanced scrolling -->
      <div
        class="overflow-y-auto overflow-x-auto scrollbar-fancy px-1 sm:px-2 py-1 table-container"
        style="max-height: calc(100vh - 250px); min-height: 160px"
      >
        <div class="min-w-full inline-block align-middle">
          <div
            class="overflow-hidden border border-gray-200/50 sm:rounded-xl shadow-md bg-white/80 backdrop-blur-sm sm:shadow-lg rounded-lg"
          >
            <!-- Responsive table with elegant styling and glass-morphism -->
            <table
              class="min-w-full divide-y divide-gray-200/50 table-auto sm:table-fixed"
            >
              <thead class="bg-[#0099FF]/10 sticky top-0 z-10 shadow-sm">
                <tr>
                  <!-- Mobile optimized headers with better mobile labels -->
                  <th
                    class="px-3 py-3.5 sm:px-4 sm:py-4 text-left text-xs font-semibold text-[#0099FF] uppercase tracking-wider w-auto sm:w-[15%] whitespace-nowrap"
                  >
                    <div class="hidden sm:inline">Jenis Pengadaan</div>
                    <div class="sm:hidden flex items-center">
                      <span
                        class="bg-[#0099FF]/20 text-[#0099FF] p-1 rounded-md text-[10px] font-bold mr-1"
                        >JP</span
                      >
                      <span>/ Detail</span>
                    </div>
                  </th>
                  <th
                    class="hidden sm:table-cell px-3 py-3.5 sm:px-4 sm:py-4 text-left text-xs font-semibold text-[#0099FF] uppercase tracking-wider w-auto sm:w-[18%] whitespace-nowrap"
                  >
                    <span>No Preorder</span>
                  </th>
                  <th
                    class="hidden sm:table-cell px-3 py-3.5 sm:px-4 sm:py-4 text-left text-xs font-semibold text-[#0099FF] uppercase tracking-wider w-auto sm:w-[15%] whitespace-nowrap"
                  >
                    Supplier
                  </th>
                  <th
                    class="hidden md:table-cell px-3 py-3.5 sm:px-4 sm:py-4 text-left text-xs font-semibold text-[#0099FF] uppercase tracking-wider w-auto sm:w-[15%] whitespace-nowrap"
                  >
                    Perusahaan
                  </th>
                  <th
                    class="hidden sm:table-cell px-3 py-3.5 sm:px-4 sm:py-4 text-left text-xs font-semibold text-[#0099FF] uppercase tracking-wider w-auto sm:w-[12%] whitespace-nowrap"
                  >
                    Kuantum
                  </th>
                  <th
                    class="px-3 py-3.5 sm:px-4 sm:py-4 text-left text-xs font-semibold text-[#0099FF] uppercase tracking-wider w-auto sm:w-[10%] whitespace-nowrap"
                  >
                    <span class="hidden sm:inline">Tanggal</span>
                    <span class="sm:hidden">Tgl</span>
                  </th>
                  <th
                    class="px-3 py-3.5 sm:px-4 sm:py-4 text-center text-xs font-semibold text-[#0099FF] uppercase tracking-wider w-auto sm:w-[15%] whitespace-nowrap"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <!-- Row template with optimizations for all screen sizes -->
                <tr
                  v-for="(item, index) in paginatedData"
                  :key="index"
                  :class="index % 2 === 0 ? 'bg-[#0099FF]/5' : 'bg-white'"
                  class="transition-all duration-200"
                >
                  <td
                    class="px-3 py-4 sm:px-4 text-sm text-gray-700 truncate max-w-[100px] sm:max-w-none border-b border-gray-200/30"
                  >
                    <div class="tooltip py-1 font-medium">
                      <!-- Mobile-optimized layout for the first column -->
                      <div class="block sm:hidden">
                        <div class="flex flex-col">
                          <span class="font-semibold text-gray-900">{{
                            item.jenisPengadaan
                          }}</span>
                          <span class="text-xs text-gray-500 mt-0.5">
                            PO: {{ item.noProorder }}
                          </span>
                        </div>
                      </div>
                      <!-- Desktop layout -->
                      <div class="hidden sm:block">
                        {{ item.jenisPengadaan }}
                      </div>
                      <span class="tooltiptext">{{ item.jenisPengadaan }}</span>
                    </div>
                  </td>
                  <td
                    class="hidden xs:table-cell px-3 py-4 sm:px-4 text-sm text-gray-700 truncate max-w-[100px] sm:max-w-none border-b border-gray-200/30"
                  >
                    <div class="tooltip py-1 font-medium text-indigo-800">
                      {{ item.noProorder }}
                      <span class="tooltiptext">{{ item.noProorder }}</span>
                    </div>
                  </td>
                  <td
                    class="hidden sm:table-cell px-3 py-4 sm:px-4 text-sm text-gray-700 truncate max-w-[100px] sm:max-w-none border-b border-gray-200/30"
                  >
                    <div class="tooltip py-1">
                      {{ item.supplier }}
                      <span class="tooltiptext">{{ item.supplier }}</span>
                    </div>
                  </td>
                  <td
                    class="hidden md:table-cell px-3 py-4 sm:px-4 text-sm text-gray-700 truncate max-w-[100px] sm:max-w-none border-b border-gray-200/30"
                  >
                    <div class="tooltip py-1">
                      {{ item.perusahaan }}
                      <span class="tooltiptext">{{ item.perusahaan }}</span>
                    </div>
                  </td>
                  <td
                    class="hidden xs:table-cell px-3 py-4 sm:px-4 text-sm text-gray-700 truncate max-w-[80px] sm:max-w-none border-b border-gray-200/30"
                  >
                    <div class="tooltip py-1 font-medium text-gray-800">
                      {{ item.kuantum }}
                      <span class="tooltiptext">{{ item.kuantum }}</span>
                    </div>
                  </td>
                  <td
                    class="px-3 py-4 sm:px-4 text-sm text-gray-700 truncate max-w-[60px] sm:max-w-none border-b border-gray-200/30"
                  >
                    <!-- Enhanced date display with better mobile styling -->
                    <span
                      class="bg-gray-100 px-2 py-1 rounded-md text-gray-700 hidden sm:inline-block"
                    >
                      {{ item.tanggal }}
                    </span>
                    <!-- Mobile-specific date display -->
                    <span
                      class="sm:hidden bg-[#0099FF]/20 px-2 py-1 rounded-md text-[#0077CC] font-medium inline-block shadow-sm"
                    >
                      {{ item.tanggal }}
                    </span>
                  </td>
                  <td
                    class="px-2 py-4 sm:px-4 text-sm text-center whitespace-nowrap border-b border-gray-200/30"
                  >
                    <!-- Redesigned action buttons for desktop with compact and consistent styling -->
                    <div class="hidden sm:flex items-center justify-center">
                      <div
                        class="inline-flex bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100/80 p-0.5"
                      >
                        <router-link
                          to="/admin/previewpermohonan"
                          @click.native="previewItem(item)"
                          class="relative group px-2 py-1 rounded-l-md hover:bg-blue-50 transition-all duration-200 flex items-center border-r border-gray-100"
                          role="button"
                          aria-label="Preview data"
                          title="Preview"
                        >
                          <div
                            class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg"
                          >
                            <div
                              class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"
                            ></div>
                            Preview
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </router-link>
                        <router-link
                          to="/admin/cetakkwitansi"
                          @click.native="printItem(item)"
                          class="relative group px-2 py-1 hover:bg-green-50 transition-all duration-200 flex items-center border-r border-gray-100"
                          role="button"
                          aria-label="Cetak data"
                          title="Cetak"
                        >
                          <div
                            class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg"
                          >
                            <div
                              class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"
                            ></div>
                            Cetak
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                            />
                          </svg>
                        </router-link>
                        <router-link
                          to="/admin/editform"
                          @click.native="editItem(item)"
                          class="relative group px-2 py-1 hover:bg-amber-50 transition-all duration-200 flex items-center border-r border-gray-100"
                          role="button"
                          aria-label="Edit data"
                          title="Edit"
                        >
                          <div
                            class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg"
                          >
                            <div
                              class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"
                            ></div>
                            Edit
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 text-amber-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </router-link>
                        <button
                          @click.prevent="deleteItem(item)"
                          class="relative group px-2 py-1 rounded-r-md hover:bg-red-50 transition-all duration-200 flex items-center"
                          role="button"
                          aria-label="Delete data"
                          title="Delete"
                        >
                          <div
                            class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg"
                          >
                            <div
                              class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"
                            ></div>
                            Delete
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <!-- Mobile view uses the action buttons in the detailed row below instead -->
                    <div class="sm:hidden"></div>
                  </td>
                </tr>
                <!-- Enhanced mobile view details row with improved organized layout -->
                <tr
                  v-for="(item, index) in paginatedData"
                  :key="`mobile-${index}`"
                  :class="index % 2 === 0 ? 'bg-[#0099FF]/5' : 'bg-white'"
                  class="sm:hidden border-t-0"
                >
                  <td colspan="5" class="px-3 py-2.5 text-xs text-gray-500">
                    <!-- Redesigned mobile card with better structure -->
                    <div
                      class="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100"
                    >
                      <!-- Header with primary info for quick identification -->
                      <div class="flex flex-col mb-3">
                        <!-- Primary info header -->
                        <div class="flex items-center justify-between mb-2">
                          <h3
                            class="text-sm font-bold text-gray-900 truncate max-w-[75%]"
                          >
                            {{ item.jenisPengadaan }}
                          </h3>
                          <span
                            class="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-md"
                          >
                            {{ item.tanggal }}
                          </span>
                        </div>
                        <!-- Secondary identifier - PO number -->
                        <div
                          class="flex items-center mb-1 bg-[#0099FF]/10 p-1.5 rounded-lg"
                        >
                          <div class="bg-[#0099FF]/20 rounded-md p-1 mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3.5 w-3.5 text-[#0099FF]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                              />
                            </svg>
                          </div>
                          <div>
                            <span
                              class="text-xs font-medium text-indigo-900 block leading-tight"
                              >No Preorder:</span
                            >
                            <span class="text-sm font-semibold text-gray-900">{{
                              item.noProorder || 'N/A'
                            }}</span>
                          </div>
                        </div>
                      </div>

                      <!-- Organized data grid with clear sections -->
                      <div class="grid grid-cols-1 gap-2.5 mb-3">
                        <!-- Company and supplier group -->
                        <div class="grid grid-cols-2 gap-2.5">
                          <div
                            class="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg"
                          >
                            <div class="flex items-center mb-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3 w-3 mr-1 text-blue-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                              <span
                                class="text-xs font-semibold text-indigo-700"
                                >Perusahaan:</span
                              >
                            </div>
                            <span class="text-sm text-gray-800 line-clamp-2">{{
                              item.perusahaan || 'N/A'
                            }}</span>
                          </div>

                          <div
                            class="bg-gradient-to-r from-purple-50 to-blue-50 p-2 rounded-lg"
                          >
                            <div class="flex items-center mb-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3 w-3 mr-1 text-purple-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                              <span
                                class="text-xs font-semibold text-indigo-700"
                                >Supplier:</span
                              >
                            </div>
                            <span class="text-sm text-gray-800 line-clamp-2">{{
                              item.supplier || 'N/A'
                            }}</span>
                          </div>
                        </div>

                        <!-- Quantity info with icon -->
                        <div
                          class="bg-gradient-to-r from-green-50 to-teal-50 p-2 rounded-lg"
                        >
                          <div class="flex items-center mb-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3 w-3 mr-1 text-green-700"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                              />
                            </svg>
                            <span class="text-xs font-semibold text-green-700"
                              >Kuantum:</span
                            >
                          </div>
                          <span
                            class="text-sm font-medium text-gray-800 block py-1"
                            >{{ item.kuantum || 'N/A' }}</span
                          >
                        </div>
                      </div>

                      <!-- Redesigned mobile action buttons with better accessibility -->
                      <div class="mt-2 pt-2 border-t border-gray-200/50">
                        <div class="flex justify-center">
                          <div
                            class="grid grid-cols-4 gap-1.5 w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100/80 p-1"
                          >
                            <router-link
                              to="/admin/previewpermohonan"
                              @click.native="previewItem(item)"
                              class="flex flex-col items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 rounded-md transition-all duration-200"
                              aria-label="Preview data"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              <span>Preview</span>
                            </router-link>
                            <router-link
                              to="/admin/cetakkwitansi"
                              @click.native="printItem(item)"
                              class="flex flex-col items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50 rounded-md transition-all duration-200"
                              aria-label="Cetak data"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                />
                              </svg>
                              <span>Cetak</span>
                            </router-link>
                            <router-link
                              to="/admin/editform"
                              @click.native="editItem(item)"
                              class="flex flex-col items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50 rounded-md transition-all duration-200"
                              aria-label="Edit data"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                              <span>Edit</span>
                            </router-link>
                            <button
                              @click.prevent="deleteItem(item)"
                              class="flex flex-col items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 rounded-md transition-all duration-200"
                              aria-label="Delete data"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <!-- Empty rows to maintain consistent height when data is sparse -->
                <template v-if="paginatedData.length < itemsPerPage">
                  <tr
                    v-for="i in itemsPerPage - paginatedData.length"
                    :key="`empty-${i}`"
                    class="hidden sm:table-row bg-transparent empty-row"
                  >
                    <td colspan="7" class="px-4 py-4 border-none"></td>
                  </tr>
                </template>
                <!-- Beautiful empty state with modern design -->
                <tr v-if="paginatedData.length === 0" class="empty-state-row">
                  <td
                    colspan="7"
                    class="px-4 py-0 text-center align-middle empty-state-cell"
                  >
                    <div
                      class="flex items-center justify-center max-w-sm mx-auto bg-white/90 p-3 px-4 rounded-xl shadow-sm border border-gray-100/80"
                    >
                      <div
                        class="mr-3 p-2 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-full border-2 border-white shadow-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-8 w-8 text-indigo-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h3
                          class="text-base text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-0.5"
                        >
                          Tidak ada data
                        </h3>
                        <p class="text-sm text-left text-gray-500 mb-0">
                          {{
                            searchQuery || selectedMonth
                              ? 'Tidak ada data yang sesuai dengan filter yang dipilih'
                              : 'Belum ada data yang tersedia'
                          }}
                        </p>
                      </div>

                      <!-- Modern reset filters button with animation -->
                      <button
                        v-if="searchQuery || selectedMonth"
                        @click="resetFilters"
                        class="ml-3 text-sm font-medium text-white flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-3 py-1.5 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow whitespace-nowrap"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Reset Filter
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Modern footer with beautiful pagination and back button -->
      <div
        class="p-4 sm:p-5 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/80 flex flex-col sm:flex-row justify-between items-center rounded-b-xl"
      >
        <!-- Enhanced pagination with glass morphism styling -->
        <div
          class="flex items-center mb-4 sm:mb-0 overflow-x-auto scrollbar-fancy pb-2 max-w-full"
        >
          <!-- Beautiful mobile pagination display with gradient -->
          <div
            class="block sm:hidden text-center bg-gradient-to-r from-blue-50 to-indigo-50 py-1 px-3 border border-indigo-100 rounded-lg shadow-sm mr-2"
          >
            <span class="font-semibold text-indigo-600">{{ currentPage }}</span>
            <span class="text-gray-500 mx-1">/</span>
            <span class="text-gray-700">{{ getTotalPages }}</span>
          </div>

          <div class="flex items-center space-x-2 min-w-max">
            <!-- Modern previous page button -->
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200"
              :class="
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50 cursor-pointer border border-indigo-200 hover:border-indigo-300 shadow-sm hover:shadow'
              "
              aria-label="Previous page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <!-- Beautiful page number buttons with active state highlight -->
            <div
              v-for="page in displayedPageNumbers"
              :key="page"
              @click="goToPage(page)"
              class="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5"
              :class="[
                currentPage === page
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold shadow'
                  : 'bg-white/80 text-gray-700 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 shadow-sm hover:shadow',
                // Hide middle pages on extra small screens where space is limited
                page !== 1 &&
                page !== getTotalPages &&
                page !== currentPage &&
                window.innerWidth < 380
                  ? 'hidden xs:flex'
                  : '',
              ]"
            >
              {{ page }}
            </div>

            <!-- Modern next page button -->
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === getTotalPages"
              class="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200"
              :class="
                currentPage === getTotalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50 cursor-pointer border border-indigo-200 hover:border-indigo-300 shadow-sm hover:shadow'
              "
              aria-label="Next page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <!-- Beautiful page input with glass morphism -->
            <div class="relative ml-3 hidden sm:flex items-center">
              <span
                class="mr-2 text-gray-700 text-sm whitespace-nowrap font-medium"
                >Halaman:</span
              >
              <div
                class="flex items-center bg-white/70 backdrop-blur-sm border border-gray-100 rounded-lg shadow-sm px-1.5"
              >
                <input
                  type="number"
                  :value="pageInput"
                  @input="
                    $emit('update:pageInput', Number($event.target.value))
                  "
                  @keyup.enter="
                    ($emit('update:pageInput', Number($event.target.value)),
                    $emit('page-input-submit'))
                  "
                  @blur="
                    ($emit('update:pageInput', Number($event.target.value)),
                    $emit('page-input-submit'))
                  "
                  min="1"
                  :max="getTotalPages"
                  class="w-14 sm:w-16 pl-2 sm:pl-3 pr-1 sm:pr-2 py-1.5 bg-transparent focus:outline-none text-center text-indigo-700 font-medium"
                  aria-label="Go to page"
                />
                <span class="mx-1 text-gray-500"
                  >/
                  <span class="text-gray-700">{{ getTotalPages }}</span></span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- Beautiful back button with modern design using router-link -->
        <router-link
          to="/admin/dashboard"
          @click.native="goBack"
          class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white px-5 sm:px-6 py-2.5 rounded-xl font-medium flex items-center shadow-sm hover:shadow focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transform transition-transform hover:-translate-y-0.5"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Custom breakpoint for extra small screens */
  @media (min-width: 480px) {
    .xs\:flex {
      display: flex !important;
    }

    .xs\:hidden {
      display: none !important;
    }

    .xs\:inline {
      display: inline !important;
    }

    .xs\:table-cell {
      display: table-cell !important;
    }
  }

  /* Modern fancy scrollbar styling */
  .scrollbar-fancy::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .scrollbar-fancy::-webkit-scrollbar-track {
    background: rgba(241, 245, 249, 0.8);
    border-radius: 8px;
  }

  .scrollbar-fancy::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #6366f1, #3b82f6);
    border-radius: 8px;
    border: 2px solid rgba(241, 245, 249, 0.8);
  }

  .scrollbar-fancy::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #4f46e5, #2563eb);
  }

  /* Default scrollbar styling */
  .overflow-y-auto::-webkit-scrollbar,
  .overflow-x-auto::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .overflow-y-auto::-webkit-scrollbar-track,
  .overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb,
  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover,
  .overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Subtle row highlight effect */
  tr {
    transition: all 0.2s ease;
  }

  /* Button hover effects */
  button {
    transition: all 0.2s ease;
  }

  /* Apply Inter font to everything */
  :root {
    font-family: 'Inter', sans-serif;
  }

  /* Tooltip for truncated text */
  .tooltip {
    position: relative;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 12px;
    position: absolute;
    z-index: 20;
    bottom: 125%;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s;
    white-space: normal;
    max-width: 90vw;
    width: max-content;
    z-index: 30; /* Ensure tooltips always appear above other elements */
  }

  @media (min-width: 640px) {
    .tooltip .tooltiptext {
      max-width: 300px;
    }
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  /* Mobile tooltip positioning */
  @media (max-width: 639px) {
    .tooltip .tooltiptext {
      left: 50%;
      transform: translateX(-50%);
      width: auto;
      max-width: 200px;
    }

    /* Add arrow for better tooltip UI on mobile */
    .tooltip .tooltiptext::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }
  }

  /* Pagination hover animations */
  .pagination-item {
    transition: all 0.2s ease;
  }

  .pagination-item:hover {
    transform: translateY(-2px);
  }

  /* Table row animations */
  tbody tr {
    transition: none; /* Remove transition effect */
  }

  /* Enhanced animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease forwards;
  }

  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  .hover-shimmer:hover {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  /* Mobile optimizations */
  @media (max-width: 639px) {
    /* Improve table responsive layout */
    .tooltip {
      max-width: 120px;
    }

    /* Touch-friendly buttons with larger hit area */
    button,
    [role='button'],
    a {
      min-height: 44px;
      min-width: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Ensure buttons have proper spacing for touch */
    .flex-wrap > a {
      margin: 3px;
      padding: 6px;
    }

    /* Improve mobile scrolling */
    .overflow-x-auto {
      -webkit-overflow-scrolling: touch;
    }
  }

  /* Extra small devices */
  @media (max-width: 479px) {
    .tooltip {
      max-width: 100px;
    }

    /* Increase touch targets further */
    button,
    [role='button'],
    a {
      min-height: 48px;
    }

    /* Reduce padding to fit more on screen */
    td,
    th {
      padding-left: 8px !important;
      padding-right: 8px !important;
    }
  }

  /* Wider screens can see more data */
  @media (min-width: 1280px) {
    .tooltip {
      max-width: 200px;
    }
  }

  /* Ensure mobile tooltips don't overflow */
  .tooltip {
    position: relative;
  }

  @media (hover: none) {
    /* Change tooltip behavior on touch devices */
    .tooltip:active .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  }

  /* Add scrollbar-thin class for nicer scrollbars */
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /* Make sure table doesn't overflow on small screens */
  @media (max-width: 479px) {
    .min-w-full {
      min-width: 100%;
      width: 100%;
    }
  }

  /* Empty rows styling */
  tr.empty-row {
    background: transparent !important;
    border: none !important;
    background-image: none !important;
  }

  tr.empty-row td {
    border: none !important;
    background: transparent !important;
    background-image: none !important;
  }

  /* Center empty state in the table */
  .empty-state-row {
    height: 100%;
  }

  .empty-state-row td {
    vertical-align: middle;
  }

  /* Empty state cell styling */
  .empty-state-cell {
    height: 160px !important;
    vertical-align: middle !important;
    border: none !important;
    padding: 0 !important;
  }

  /* Empty state messaging - make sure it's centered and visible */
  .table-container:has(tbody tr.empty-state-row) table {
    margin-top: 0;
  }

  /* Ensure proper vertical alignment for empty state */
  tbody:has(tr.empty-state-row) {
    height: 160px;
  }

  tbody:has(tr.empty-state-row) .align-middle {
    vertical-align: middle !important;
  }

  /* Alternative approach for browsers that don't support :has() */
  .table-container:has(tbody tr.empty-state-row) {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow-y: hidden !important;
    padding-top: 0;
  }

  /* Another approach using JS-applied classes */
  .has-empty-state {
    min-height: 160px !important;
    display: flex !important;
    align-items: flex-start !important;
    justify-content: center !important;
    padding-top: 0 !important;
  }

  /* Empty state when no data is present */
  .table-container tbody:empty::after {
    content: '';
    display: block;
    height: 160px;
  }

  /* Remove background colors from empty rows */
  tr.hidden.sm\:table-row.bg-transparent {
    background: transparent !important;
    border: none !important;
  }

  /* Override any zebra-striping for empty rows */
  tr.empty-row:nth-child(odd),
  tr.empty-row:nth-child(even) {
    background: transparent !important;
    background-image: none !important;
  }

  /* Override background transitions that might interfere */
  tr.empty-row {
    transition: none !important;
  }

  /* Mobile optimizations */
  @media (max-width: 640px) {
    /* Improved mobile table layout */
    .table-container {
      padding: 0.25rem !important;
      border-radius: 0.75rem !important;
    }

    /* Make sure mobile rows are properly spaced */
    tbody tr.border-t-0 {
      margin-top: -0.25rem !important;
    }

    /* Better mobile card styles */
    td[colspan='5'] .bg-white {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04) !important;
      border: 1px solid rgba(226, 232, 240, 0.7) !important;
    }
    /* Improved text readability on small screens */
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Enhanced pagination on mobile */
    .scrollbar-fancy.pb-2 {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .scrollbar-fancy.pb-2::-webkit-scrollbar {
      display: none;
    }
  }

  /* Enhanced table display on small screens */
  @media (max-width: 480px) {
    /* Better touch targets for mobile */
    button[aria-label] {
      min-height: 2.5rem;
    }

    /* Ensure content doesn't get cut off */
    .table-container {
      max-height: calc(100vh - 230px) !important;
    }

    /* Better empty state positioning */
    .empty-state-cell > div {
      padding: 1rem 0.5rem !important;
    }
  }
</style>
