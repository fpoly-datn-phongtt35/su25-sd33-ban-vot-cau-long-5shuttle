
// Pages
import AdminLayout from '../components/Layout/AdminLayout';
import Admin from '../pages/admin';
import Home from '../pages/users/Home';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };