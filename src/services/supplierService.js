import api from './api';

export const SupplierService = {
  getAll(params) {
    return api.get('/supplier', { params });
  },
  
  getById(id) {
    return api.get(`/supplier/${id}`);
  },
  
  create(data) {
    return api.post('/supplier', data);
  },
  
  update(id, data) {
    return api.put(`/supplier/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/supplier/${id}`);
  },

  // Mendapatkan histori transaksi supplier
  getTransactionHistory(id, params) {
    return api.get(`/supplier/${id}/transactions`, { params });
  },

  // Mendapatkan daftar supplier berdasarkan kategori produk
  getByCategory(categoryId) {
    return api.get(`/supplier/by-category/${categoryId}`);
  },

  // Mendapatkan supplier dengan rating tertinggi
  getTopRated() {
    return api.get('/supplier/top-rated');
  },

  // Mencari supplier berdasarkan nama atau produk
  search(query) {
    return api.get(`/supplier/search?q=${query}`);
  }
};

export default SupplierService;
