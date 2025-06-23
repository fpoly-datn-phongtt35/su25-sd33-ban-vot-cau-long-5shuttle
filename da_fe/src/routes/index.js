
// Pages
import AdminLayout from '../components/Layout/AdminLayout';
import Admin from '../pages/admin';
import Home from '../pages/users/Home';
import customer from '../pages/admin/customer/index.jsx';
import AddCustomer from '../pages/admin/customer/add.jsx';
import EditCustomer from '../pages/admin/customer/edit.jsx';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/admin/tai-khoan/khach-hang', component: customer, layout: AdminLayout },
    { path: '/admin/tai-khoan/khach-hang/add', component: AddCustomer, layout: AdminLayout },
    { path: '/admin/tai-khoan/khach-hang/edit/:id', component: EditCustomer, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };