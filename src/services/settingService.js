import api from './api';

export const SettingService = {
  // Mendapatkan pengaturan sistem
  getSystemSettings() {
    return api.get('/settings/system');
  },
  
  // Memperbarui pengaturan sistem
  updateSystemSettings(data) {
    return api.put('/settings/system', data);
  },
  
  // Mendapatkan pengaturan user
  getUserSettings() {
    return api.get('/settings/user');
  },
  
  // Memperbarui pengaturan user
  updateUserSettings(data) {
    return api.put('/settings/user', data);
  },

  // Mendapatkan pengaturan notifikasi
  getNotificationSettings() {
    return api.get('/settings/notifications');
  },

  // Memperbarui pengaturan notifikasi
  updateNotificationSettings(data) {
    return api.put('/settings/notifications', data);
  },

  // Mengambil data backup
  getBackupList() {
    return api.get('/settings/backups');
  },

  // Membuat backup baru
  createBackup() {
    return api.post('/settings/backups');
  },

  // Download backup
  downloadBackup(id) {
    return api.get(`/settings/backups/${id}/download`, {
      responseType: 'blob'
    });
  },

  // Restore backup
  restoreBackup(id) {
    return api.post(`/settings/backups/${id}/restore`);
  }
};

export default SettingService;
