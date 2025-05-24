import api from './api';
import { CsrfService } from './csrfService';

// Export as a named constant AND as default for backward compatibility
export const PermohonanService = {
  // Helper method to ensure we have a CSRF token for operations that modify data
  async _ensureCsrfToken() {
    await CsrfService.getCsrfToken();
  },
  getAll(params) {
    return api.get('/pengadaan', { params });
  },
  
  getById(id) {
    return api.get(`/pengadaan/${id}`);
  },
    async create(data) {
    await this._ensureCsrfToken();
    return api.post('/pengadaan', data);
  },
  
  async update(id, data) {
    await this._ensureCsrfToken();
    return api.put(`/pengadaan/${id}`, data);
  },
  
  async delete(id) {
    await this._ensureCsrfToken();
    return api.delete(`/pengadaan/${id}`);
  },

  // Mendapatkan kwitansi dalam format PDF
  downloadKwitansi(id) {
    return api.get(`/pengadaan/${id}/kwitansi`, {
      responseType: 'blob'
    });
  },

  // Mendapatkan data rekap
  getRekapData(params) {
    return api.get('/pengadaan/rekap', { params });
  },

  // Mendapatkan riwayat edit pengadaan
  getRiwayatEdit(params) {
    return api.get('/pengadaan/riwayat-edit', { params });
  },

  // Mendapatkan statistik untuk dashboard
  getStatistics() {
    return api.get('/pengadaan/statistics');
  },

  // Verifikasi pengadaan
  verifypengadaan(id, data) {
    return api.post(`/pengadaan/${id}/verify`, data);
  },

  // Tolak pengadaan
  rejectpengadaan(id, data) {
    return api.post(`/pengadaan/${id}/reject`, data);
  }
};

// Export the same object as default
export default PermohonanService;
