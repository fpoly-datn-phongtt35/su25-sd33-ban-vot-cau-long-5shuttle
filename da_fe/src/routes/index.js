// Pages
import AdminLayout from '../components/Layout/AdminLayout';
import Admin from '../pages/admin';
import Balance from '../pages/admin/Balance';
import Brand from '../pages/admin/Brand';
import Color from '../pages/admin/Color';
import Material from '../pages/admin/Material';
import SanPham from '../pages/admin/Product';
import Stiff from '../pages/admin/Stiff';
import Weight from '../pages/admin/Weight';
import Update from '../pages/admin/Giảm Giá/PhieuGiamGia/update.jsx';
import ModalKhachHang from '../pages/admin/khuyenmai/ModalKhachHang';
import Index from '../pages/admin/nhanvien';
import Add from '../pages/admin/nhanvien/add';
import Edit from '../pages/admin/nhanvien/edit';
import Home from '../pages/users/Home';
import Product from '../pages/users/Product/Product';
import ProductAdmin from '../pages/admin/Product';
import AddProduct from '../pages/admin/Product/Add';
import Cart from '../pages/users/Cart/Cart';
import ProductDetail from '../pages/users/ProductDetail/ProductDetail';
import CheckOut from '../pages/users/CheckOut/CheckOut';
import SuccessOrder from '../pages/users/SuccessOrder/SuccessOrder';
import OrderStatus from '../pages/admin/Order/OrderStatus';
import Order from '../pages/admin/Order';
import Indexx from '../pages/admin/Giảm Giá/PhieuGiamGia/index.jsx';
import AddVoucher from '../pages/admin/Giảm Giá/PhieuGiamGia/add.jsx';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin, layout: AdminLayout },
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
    { path: '/admin/giam-gia/phieu-giam-gia', component: Indexx, layout: AdminLayout },
    { path: '/admin/giam-gia/phieu-giam-gia/add', component: AddVoucher, layout: AdminLayout },
    { path: `/admin/giam-gia/phieu-giam-gia/:id/detail`, component: Update, layout: AdminLayout },

    { path: '/admin/tai-khoan/nhan-vien', component: Index, layout: AdminLayout },
    { path: '/admin/tai-khoan/nhan-vien/add', component: Add, layout: AdminLayout },
    { path: '/admin/tai-khoan/nhan-vien/edit/:id', component: Edit, layout: AdminLayout }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
