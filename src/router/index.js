import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/Login.vue'
import ResetRequest from '@/views/login/ResetPassword.vue'
import ResetPasswordAccepted from '@/views/login/ResetPasswordAccepted.vue'
import DashboardAdmin from '@/views/admin/AdminView.vue'
import FormAdmin from '@/views/admin/FormData.vue'
import LihatDataAdmin from '@/views/admin/LihatData.vue'
import EditFormData from '@/views/admin/EditFormData.vue'
import PreviewPermohonan from '@/views/admin/PreviewPermohonan.vue'
import CetakKwitansi from '@/views/admin/CetakKwitansi.vue'
import SuperAdminView from '@/views/superadmin/SuperAdminView.vue'
import RiwayatView from '@/views/superadmin/RiwayatView.vue'
import RiwayatEditView from '@/views/superadmin/RiwayatEditView.vue'
import Staff from '@/views/superadmin/StaffView.vue'
import FormDataView from '@/views/superadmin/FormDataView.vue'
import StaffAddEditView from '@/views/superadmin/StaffAddEditView.vue'
import RekapDataView from '@/views/superadmin/RekapDataView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Guest Route
    {
      path: '/',
      component: Login,
    },
    {
      path: '/resetpassword',
      component: ResetRequest,
      name: 'ResetRequest',
    },
    {
      path: '/resetpasswordaccepted',
      component: ResetPasswordAccepted,
      name: 'ResetPasswordAccepted',
    },

    // Admin Routes
    {
      path: '/admin',
      component: Login,
    },
    {
      path: '/admin/dashboard',
      component: DashboardAdmin,
      name: 'Dashboard',
    },
    {
      path: '/admin/form',
      component: FormAdmin,
      name: 'Form',
    },
    {
      path: '/admin/lihatdata',
      component: LihatDataAdmin,
      name: 'LihatData',
    },
    {
      path: '/admin/editform',
      component: EditFormData,
      name: 'EditPage',
    },
    {
      path: '/admin/previewpermohonan',
      component: PreviewPermohonan,
      name: 'DetailPage',
    },
    {
      path: '/admin/cetakkwitansi',
      component: CetakKwitansi,
      name: 'PrintPage',
    },

    // Super Admin Routes
    {
      path: '/superadmin/dashboard',
      name: 'superadmin dashboard',
      component: SuperAdminView,
    },
    {
      path: '/superadmin/input',
      name: 'formdata superadmin',
      component: FormDataView,
    },
    {
      path: '/superadmin/riwayat',
      name: 'riwayat superadmin',
      component: RiwayatView,
    },
    {
      path: '/superadmin/riwayat-edit/:id',
      name: 'edit riwayat',
      component: RiwayatEditView,
    },
    {
      path: '/superadmin/staff',
      name: 'staff',
      component: Staff,
    },
    {
      path: '/superadmin/staff-add',
      name: 'add staff',
      component: StaffAddEditView,
    },
    {
      path: '/superadmin/staff-edit/:id',
      name: 'edit staff',
      component: StaffAddEditView,
      props: true,
    },
    {
      path: '/superadmin/rekapdata',
      name: 'rekap data',
      component: RekapDataView,
    },
  ],
})

export default router
