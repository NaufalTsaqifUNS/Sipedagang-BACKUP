import api from './api';

export const ReportService = {
  getPermohonanReport(params) {
    return api.get('/reports/permohonan', { params });
  },
  
  getStatisticsReport(params) {
    return api.get('/reports/statistics', { params });
  },
  
  getStaffActivityReport(params) {
    return api.get('/reports/staff-activity', { params });
  },
  
  getMonthlyReport(params) {
    return api.get('/reports/monthly', { params });
  },

  getYearlyReport(params) {
    return api.get('/reports/yearly', { params });
  },

  // Download PDF reports
  downloadPermohonanReport(params) {
    return api.get('/reports/permohonan/download', {
      params,
      responseType: 'blob'
    });
  },

  downloadStatisticsReport(params) {
    return api.get('/reports/statistics/download', {
      params,
      responseType: 'blob'
    });
  },

  downloadMonthlyReport(params) {
    return api.get('/reports/monthly/download', {
      params,
      responseType: 'blob'
    });
  },

  downloadYearlyReport(params) {
    return api.get('/reports/yearly/download', {
      params,
      responseType: 'blob'
    });
  },

  // Export data ke Excel
  exportToExcel(reportType, params) {
    return api.get(`/reports/${reportType}/excel`, {
      params,
      responseType: 'blob'
    });
  }
};

export default ReportService;
