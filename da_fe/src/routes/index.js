
// Pages
import AdminLayout from '../components/Layout/AdminLayout';
import Admin from '../pages/admin';
import Index from '../pages/admin/Giảm Giá/Phiếu Giảm Giá/index.jsx';
import Add from '../pages/admin/Giảm Giá/Phiếu Giảm Giá/add.jsx';
import Update from '../pages/admin/Giảm Giá/Phiếu Giảm Giá/update.jsx';
import Home from '../pages/users/Home';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/admin/giam-gia/phieu-giam-gia', component: Index, layout: AdminLayout },
    { path: '/admin/giam-gia/phieu-giam-gia/add', component: Add, layout: AdminLayout },
    { path: `/admin/giam-gia/phieu-giam-gia/:id/detail`, component: Update, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };