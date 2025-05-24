// Mengumpulkan semua services dalam satu file ekspor

import AuthService from './authService';
import PermohonanService from './permohonanService';
import StaffService from './staffService';
import SupplierService from './supplierService';
import ReportService from './reportService';
import NotificationService from './notificationService';
import DashboardService from './dashboardService';
import SettingService from './settingService';
import ApiUtils from './apiUtils';
import { CsrfService } from './csrfService';

// Mengekspor semua services sehingga bisa diimpor dari satu lokasi
export {
  AuthService,
  PermohonanService,
  StaffService,
  SupplierService,
  ReportService,
  NotificationService,
  DashboardService,
  SettingService,
  ApiUtils,
  CsrfService
};

// Juga mengekspor api untuk penggunaan langsung jika diperlukan
export { default as api } from './api';
