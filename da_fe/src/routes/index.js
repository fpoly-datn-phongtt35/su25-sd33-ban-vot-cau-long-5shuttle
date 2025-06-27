
// Pages
import AdminLayout from '../components/Layout/AdminLayout';
import Admin from '../pages/admin';
import Home from '../pages/users/Home';
import ThongKe from '../pages/admin/HoaDon/ThongKe';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/admin/thong-ke', component: ThongKe, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };