
// Pages
import AdminLayout from '../components/Layout/AdminLayout';
import Admin from '../pages/admin';
import ModalKhachHang from '../pages/admin/khuyenmai/ModalKhachHang';
import Index from '../pages/admin/nhanvien';
import Add from '../pages/admin/nhanvien/add';
import Edit from '../pages/admin/nhanvien/edit';
import Home from '../pages/users/Home';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/admin/tai-khoan/nhan-vien', component: Index, layout: AdminLayout },
    { path: '/admin/tai-khoan/nhan-vien/add', component: Add, layout: AdminLayout },
    { path: '/admin/tai-khoan/nhan-vien/edit/:id', component: Edit, layout: AdminLayout },
    { path: '/admin/giam-gia/phieu-giam-gia', component: ModalKhachHang, layout: AdminLayout }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };