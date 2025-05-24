import api from './api';

export const NotificationService = {
  // Mendapatkan semua notifikasi
  getAll(params) {
    return api.get('/notifications', { params });
  },
  
  // Mendapatkan notifikasi yang belum dibaca
  getUnread() {
    return api.get('/notifications/unread');
  },
  
  // Menandai notifikasi sebagai telah dibaca
  markAsRead(id) {
    return api.patch(`/notifications/${id}/mark-as-read`);
  },
  
  // Menandai semua notifikasi sebagai telah dibaca
  markAllAsRead() {
    return api.patch('/notifications/mark-all-as-read');
  },

  // Menghapus notifikasi
  delete(id) {
    return api.delete(`/notifications/${id}`);
  },

  // Menghapus semua notifikasi
  deleteAll() {
    return api.delete('/notifications/delete-all');
  },

  // Mendapatkan jumlah notifikasi yang belum dibaca
  getUnreadCount() {
    return api.get('/notifications/unread-count');
  },

  // Mendapatkan notifikasi terbaru
  getLatest(limit = 5) {
    return api.get(`/notifications/latest?limit=${limit}`);
  }
};

export default NotificationService;
