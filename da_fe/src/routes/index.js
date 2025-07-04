
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
import Home from '../pages/users/Home';
import ThongKe from '../pages/admin/HoaDon/ThongKe';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/admin/giam-gia/phieu-giam-gia', component: Index, layout: AdminLayout },
    { path: '/admin/giam-gia/phieu-giam-gia/add', component: Add, layout: AdminLayout },
    { path: `/admin/giam-gia/phieu-giam-gia/:id/detail`, component: Update, layout: AdminLayout },

    { path: '/admin/quan-ly-san-pham/mau-sac', component: Color, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/san-pham', component: SanPham, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/diem-can-bang', component: Balance, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/thuong-hieu', component: Brand, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/chat-lieu', component: Material, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/trong-luong', component: Weight, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/do-cung', component: Stiff, layout: AdminLayout },
    { path: '/san-pham', component: Product },
    { path: '/admin/quan-ly-san-pham/san-pham-ct', component: ProductAdmin, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/san-pham-ct/add', component: AddProduct, layout: AdminLayout },
    { path: '/gio-hang', component: Cart },
    { path: '/xac-nhan-don-hang', component: SuccessOrder },
    { path: '/san-pham/san-pham-ct/:id', component: ProductDetail },
    { path: '/admin/quan-ly-don-hang', component: Order, layout: AdminLayout },
    { path: '/admin/quan-ly-don-hang/order-status', component: OrderStatus, layout: AdminLayout },
    { path: '/gio-hang/checkout', component: CheckOut },
    { path: '/admin/giam-gia/phieu-giam-gia/add', component: AddVoucher, layout: AdminLayout },
    { path: '/admin/giam-gia/phieu-giam-gia', component: PhieuGiamGia, layout: AdminLayout },
    { path: `/admin/giam-gia/phieu-giam-gia/:id/detail`, component: UpdatePhieuGiamGia, layout: AdminLayout },
    { path: '/admin/giam-gia/dot-giam-gia', component: DotGiamGia, layout: AdminLayout },
    { path: '/admin/giam-gia/dot-giam-gia/add', component: AddDotGiamGia, layout: AdminLayout },
    { path: '/admin/giam-gia/dot-giam-gia/:id/detail', component: UpdateDotGiamGia, layout: AdminLayout },
    // { path: '/admin/tai-khoan/nhan-vien', component: Index, layout: AdminLayout },
    // { path: '/admin/tai-khoan/nhan-vien/add', component: Add, layout: AdminLayout },
    // { path: '/admin/tai-khoan/nhan-vien/edit/:id', component: Edit, layout: AdminLayout },
    // { path: '/admin/giam-gia/phieu-giam-gia/add', component: AddPhieuGiamGia, layout: AdminLayout },
    // { path: `/admin/giam-gia/phieu-giam-gia/:id/detail`, component: Update, layout: AdminLayout },
    { path: '/admin/tai-khoan/nhan-vien', component: ListStaff, layout: AdminLayout },
    { path: '/admin/tai-khoan/nhan-vien/add', component: AddStaff, layout: AdminLayout },
    { path: '/admin/tai-khoan/nhan-vien/edit/:id', component: EditStaff, layout: AdminLayout },
    { path: '/admin/login', component: AdLogin },
    { path: '/profile', component: Profile, children: [
        { path: 'user', component: UserInfo }
    ] },
    { path: '/login', component: Sign },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/admin/thong-ke', component: ThongKe, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
