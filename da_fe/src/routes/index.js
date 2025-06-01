
// Pages
import AdminLayout from '../components/Layout/AdminLayout';
import Admin from '../pages/admin';
import Balance from '../pages/admin/Balance';
import Brand from '../pages/admin/Brand';
import Color from '../pages/admin/Color';
import Material from '../pages/admin/Material';
import Product from '../pages/admin/Product';
import Stiff from '../pages/admin/Stiff';
import Weight from '../pages/admin/Weight';
import Home from '../pages/users/Home';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/mau-sac', component: Color, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/san-pham', component: Product, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/diem-can-bang', component: Balance, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/thuong-hieu', component: Brand, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/chat-lieu', component: Material, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/trong-luong', component: Weight, layout: AdminLayout },
    { path: '/admin/quan-ly-san-pham/do-cung', component: Stiff, layout: AdminLayout },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };