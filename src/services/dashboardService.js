import api from './api';

export const DashboardService = {
  // Mendapatkan data untuk dashboard admin
  getAdminDashboardData() {
    return api.get('/dashboard/admin');
  },
  
  // Mendapatkan data untuk dashboard superadmin
  getSuperAdminDashboardData() {
    return api.get('/dashboard/superadmin');
  },
  
  // Mendapatkan data statistik permohonan
  getPermohonanStatistics(params) {
    return api.get('/dashboard/permohonan-statistics', { params });
  },
  
  // Mendapatkan data tren permohonan
  getPermohonanTrends(params) {
    return api.get('/dashboard/permohonan-trends', { params });
  },

  // Mendapatkan data untuk grafik perbandingan bulan ini dengan bulan sebelumnya
  getMonthlyComparison() {
    return api.get('/dashboard/monthly-comparison');
  },

  // Mendapatkan daftar permohonan terbaru
  getLatestPermohonan(limit = 5) {
    return api.get(`/dashboard/latest-permohonan?limit=${limit}`);
  },

  // Mendapatkan data aktivitas staff
  getStaffActivities(limit = 5) {
    return api.get(`/dashboard/staff-activities?limit=${limit}`);
  },

  // Mendapatkan data rekapitulasi
  getRecapData(params) {
    return api.get('/dashboard/recap', { params });
  }
};

export default DashboardService;
