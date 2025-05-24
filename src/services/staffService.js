import api from './api';

export const StaffService = {
  getAll(params) {
    return api.get('/staff', { params });
  },
  
  getById(id) {
    return api.get(`/staff/${id}`);
  },
  
  create(data) {
    return api.post('/staff', data);
  },
  
  update(id, data) {
    return api.put(`/staff/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/staff/${id}`);
  },

  // Reset password staff
  resetPassword(id) {
    return api.post(`/staff/${id}/reset-password`);
  },

  // Mengubah status aktif/nonaktif staff
  toggleStatus(id, isActive) {
    return api.patch(`/staff/${id}/status`, { is_active: isActive });
  },

  // Mendapatkan log aktivitas staff
  getActivityLogs(id, params) {
    return api.get(`/staff/${id}/activities`, { params });
  },
  
  // Mengubah role staff
  changeRole(id, role) {
    return api.patch(`/staff/${id}/role`, { role });
  }
};

export default StaffService;
