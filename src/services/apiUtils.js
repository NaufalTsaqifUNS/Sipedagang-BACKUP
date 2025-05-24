import Swal from 'sweetalert2';

/**
 * Utility untuk menangani error dari API
 * @param {Error} error - Error dari axios
 * @param {Object} options - Opsi tambahan
 * @param {boolean} options.showAlert - Menampilkan alert menggunakan SweetAlert2
 * @param {string} options.fallbackMessage - Pesan default jika tidak ada detail error
 * @param {Function} options.callback - Fungsi callback yang dijalankan setelah error ditangani
 * @returns {Object} Objek dengan detail error
 */
export const handleApiError = (error, options = {}) => {
  const {
    showAlert = true,
    fallbackMessage = 'Terjadi kesalahan. Silakan coba lagi nanti.',
    callback = null
  } = options;

  let errorMessage = fallbackMessage;
  let errorDetails = null;

  // Mengekstrak pesan error dari respons API
  if (error.response) {
    // Error dari server dengan respons
    const { status, data } = error.response;

    if (data.message) {
      errorMessage = data.message;
    }

    if (data.errors) {
      // Validation errors
      errorDetails = data.errors;
      // Gabungkan semua pesan error menjadi satu string
      const errorMessages = Object.values(data.errors).flat();
      if (errorMessages.length > 0) {
        errorMessage = errorMessages.join(', ');
      }
    }

    // Log error berdasarkan status code
    console.error(`API Error (${status}):`, errorMessage, data);
  } else if (error.request) {
    // Request dibuat tapi tidak ada respons (masalah jaringan)
    console.error('Network Error:', error.request);
    errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
  } else {
    // Error saat menyiapkan request
    console.error('Request Error:', error.message);
  }

  // Tampilkan alert jika diperlukan
  if (showAlert) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      confirmButtonColor: '#0099FF'
    }).then(() => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  }

  return {
    message: errorMessage,
    details: errorDetails,
    original: error
  };
};

/**
 * Utility untuk menampilkan notifikasi sukses
 * @param {string} message - Pesan sukses
 * @param {Function} callback - Fungsi yang dijalankan setelah notifikasi ditutup
 */
export const showSuccessNotification = (message, callback = null) => {
  Swal.fire({
    icon: 'success',
    title: 'Berhasil',
    text: message,
    confirmButtonColor: '#0099FF'
  }).then(() => {
    if (callback && typeof callback === 'function') {
      callback();
    }
  });
};

/**
 * Utility untuk menampilkan konfirmasi
 * @param {string} message - Pesan konfirmasi
 * @param {Function} onConfirm - Fungsi yang dijalankan jika konfirmasi diterima
 * @param {Function} onCancel - Fungsi yang dijalankan jika konfirmasi ditolak
 * @param {Object} options - Opsi tambahan untuk SweetAlert2
 */
export const showConfirmation = (message, onConfirm, onCancel = null, options = {}) => {
  const defaultOptions = {
    icon: 'question',
    title: 'Konfirmasi',
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#0099FF',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak'
  };

  Swal.fire({
    ...defaultOptions,
    ...options
  }).then((result) => {
    if (result.isConfirmed) {
      if (onConfirm && typeof onConfirm === 'function') {
        onConfirm();
      }
    } else if (onCancel && typeof onCancel === 'function') {
      onCancel();
    }
  });
};

export default {
  handleApiError,
  showSuccessNotification,
  showConfirmation
};
