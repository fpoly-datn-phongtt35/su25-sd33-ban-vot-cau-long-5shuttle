
// Pages
import AdminLayout from '../components/Layout/AdminLayout';
import Admin from '../pages/admin';
import Index from '../pages/admin/Giảm Giá/Phiếu Giảm Giá/index.jsx';
import Add from '../pages/admin/Giảm Giá/Phiếu Giảm Giá/add.jsx';
import Update from '../pages/admin/Giảm Giá/Phiếu Giảm Giá/update.jsx';
import ModalKhachHang from '../pages/admin/khuyenmai/ModalKhachHang';
import ListStaff from '../pages/admin/nhanvien';
import AddStaff from '../pages/admin/nhanvien/add';
import EditStaff from '../pages/admin/nhanvien/edit';
import Home from '../pages/users/Home';
import AdLogin from '../pages/admin/ad-login.jsx';
import Profile from '../pages/users/TaiKhoan/profile.jsx';
import Sign from '../pages/users/DangNhap/sign.jsx';
import ForgotPassword from '../pages/users/DangNhap/forgot-password.jsx';
import UserInfo from '../pages/users/TaiKhoan/userInfo.jsx';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/admin/giam-gia/phieu-giam-gia', component: Index, layout: AdminLayout },
    { path: '/admin/giam-gia/phieu-giam-gia/add', component: Add, layout: AdminLayout },
    { path: `/admin/giam-gia/phieu-giam-gia/:id/detail`, component: Update, layout: AdminLayout },

    { path: '/admin/tai-khoan/nhan-vien', component: ListStaff, layout: AdminLayout },
    { path: '/admin/tai-khoan/nhan-vien/add', component: AddStaff, layout: AdminLayout },
    { path: '/admin/tai-khoan/nhan-vien/edit/:id', component: EditStaff, layout: AdminLayout },
    { path: '/admin/login', component: AdLogin },
    { path: '/profile', component: Profile, children: [
        { path: 'user', component: UserInfo }
    ] },
    { path: '/login', component: Sign },
    { path: '/forgot-password', component: ForgotPassword }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };