import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Settings, Moon, Sun } from 'react-feather';
import user_icon from '../../../Assets/user_icon.png';
import { Avatar } from '@mui/material';
import { LogOut, LogIn, User, Shield, Activity } from 'react-feather';
import Swal from 'sweetalert2';

function HeaderAdmin() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userRole, setUserRole] = useState("Admin");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications] = useState([
        { id: 1, title: 'Đơn hàng mới', message: 'Có 3 đơn hàng mới cần xử lý', time: '5 phút trước', unread: true },
        { id: 2, title: 'Sản phẩm hết hàng', message: 'Sản phẩm ABC sắp hết hàng', time: '1 giờ trước', unread: true },
        { id: 3, title: 'Đánh giá mới', message: 'Có đánh giá 5 sao từ khách hàng', time: '2 giờ trước', unread: false },
    ]);

    const menuRef = useRef(null);
    const notificationRef = useRef(null);
    const navigate = useNavigate();

    // Thông tin giả lập cho admin
    const admin = {
        hoTen: "Nguyễn Văn A",
        email: "admin@example.com",
        sdt: "0123456789",
        ngaySinh: "1990-01-01",
        gioiTinh: 1,
        vaiTro: "Admin",
        avatar: user_icon,
        lastLogin: "Hôm nay 14:30"
    };

    const unreadCount = notifications.filter(n => n.unread).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAccount = () => {
        Swal.fire({
            title: "Xác nhận đăng xuất tài khoản?",
            text: "Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2f19ae",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đăng xuất",
            cancelButtonText: "Hủy",
            customClass: {
                popup: 'rounded-xl',
                confirmButton: 'rounded-lg px-6 py-2',
                cancelButton: 'rounded-lg px-6 py-2'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleConfirm();
            }
        });
    };

    const handleConfirm = () => {
        console.log('Đăng xuất thành công');
        setIsLoggedIn(false);
        setUserRole(null);
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        // Implement search logic here
    };

    return (
        <header className="ml-[30px] sticky top-0 z-40 flex items-center justify-between w-full h-[80px] bg-white/95 backdrop-blur-md px-6 shadow-lg border-b border-gray-100 transition-all duration-300">
            {/* Left Section - Search */}
            <div className="flex items-center flex-1 max-w-md">
                <form onSubmit={handleSearch} className="relative w-full group">
                    <div className="flex items-center bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-3 transition-all duration-300 group-focus-within:shadow-lg group-focus-within:scale-[1.02] border-2 border-transparent group-focus-within:border-[#2f19ae]/20">
                        <Search className="text-gray-400 group-focus-within:text-[#2f19ae] transition-colors duration-300 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm, đơn hàng, khách hàng..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="ml-3 w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    
                    {/* Search suggestions could go here */}
                    {searchQuery && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 animate-in slide-in-from-top-2 duration-200 opacity-100">
                            <div className="px-4 py-2 text-sm text-gray-500">Tìm kiếm gần đây</div>
                            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">Đơn hàng #12345</div>
                            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">Khách hàng Nguyễn Văn B</div>
                        </div>
                    )}
                </form>
            </div>

            {/* Right Section - Actions & User Info */}
            <div className="flex items-center space-x-4">
                {/* Quick Stats */}
                <div className="hidden lg:flex items-center space-x-6 mr-4">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <Activity className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">Online</span>
                    </div>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-3 rounded-xl bg-gradient-to-r from-gray-50 to-purple-50 hover:from-[#2f19ae]/10 hover:to-purple-500/10 transition-all duration-300 hover:shadow-md group"
                >
                    {isDarkMode ? (
                        <Sun className="w-5 h-5 text-gray-600 group-hover:text-[#2f19ae] transition-colors duration-300" />
                    ) : (
                        <Moon className="w-5 h-5 text-gray-600 group-hover:text-[#2f19ae] transition-colors duration-300" />
                    )}
                </button>

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        className="relative p-3 rounded-xl bg-gradient-to-r from-gray-50 to-purple-50 hover:from-[#2f19ae]/10 hover:to-purple-500/10 transition-all duration-300 hover:shadow-md group"
                    >
                        <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#2f19ae] transition-colors duration-300" />
                        {unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center rounded-full text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold animate-pulse">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </div>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {isNotificationOpen && (
                        <div className="absolute right-0 mt-3 bg-white shadow-2xl rounded-2xl w-80 py-3 text-gray-700 z-50 border border-gray-100 animate-in slide-in-from-top-2 duration-200 max-h-96 overflow-y-auto">
                            <div className="absolute top-0 right-4 w-3 h-3 bg-white transform rotate-45 -translate-y-1/2 border-l border-t border-gray-100"></div>
                            
                            <div className="px-4 py-3 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-800 flex items-center justify-between">
                                    Thông báo
                                    <span className="text-xs bg-[#2f19ae] text-white px-2 py-1 rounded-full">{unreadCount}</span>
                                </h3>
                            </div>

                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 transition-all duration-200 ${
                                            notification.unread 
                                                ? 'border-[#2f19ae] bg-gradient-to-r from-[#2f19ae]/5 to-purple-500/5' 
                                                : 'border-transparent'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className={`text-sm font-medium ${notification.unread ? 'text-gray-800' : 'text-gray-600'}`}>
                                                    {notification.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                            </div>
                                            {notification.unread && (
                                                <div className="w-2 h-2 bg-[#2f19ae] rounded-full ml-2 mt-1"></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="px-4 py-2 border-t border-gray-100">
                                <button className="w-full text-center text-sm text-[#2f19ae] hover:text-purple-600 font-medium transition-colors duration-200">
                                    Xem tất cả thông báo
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Settings */}
                <button className="p-3 rounded-xl bg-gradient-to-r from-gray-50 to-purple-50 hover:from-[#2f19ae]/10 hover:to-purple-500/10 transition-all duration-300 hover:shadow-md group">
                    <Settings className="w-5 h-5 text-gray-600 group-hover:text-[#2f19ae] transition-colors duration-300" />
                </button>

                {/* User Info & Avatar */}
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                    <div className="hidden md:block text-right">
                        <p className="text-gray-800 text-sm font-semibold">{admin.hoTen}</p>
                        <div className="flex items-center justify-end space-x-1">
                            <Shield className="w-3 h-3 text-[#2f19ae]" />
                            <p className="text-[#2f19ae] text-xs font-medium">{admin.vaiTro}</p>
                        </div>
                        <p className="text-gray-400 text-xs">{admin.lastLogin}</p>
                    </div>

                    {/* Avatar Dropdown */}
                    <div className="relative" ref={menuRef}>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#2f19ae]/10 hover:to-purple-500/10 hover:shadow-md group"
                        >
                            <div className="relative">
                                <Avatar 
                                    src={admin.avatar} 
                                    alt={admin.hoTen}
                                    className="w-10 h-10 ring-2 ring-transparent group-hover:ring-[#2f19ae]/30 transition-all duration-300" 
                                />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                            </div>
                        </button>

                        {/* User Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-3 bg-white shadow-2xl rounded-2xl w-72 py-3 text-gray-700 z-50 border border-gray-100 animate-in slide-in-from-top-2 duration-200">
                                <div className="absolute top-0 right-4 w-3 h-3 bg-white transform rotate-45 -translate-y-1/2 border-l border-t border-gray-100"></div>
                                
                                {/* User Info Header */}
                                <div className="px-4 py-4 border-b border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <Avatar src={admin.avatar} className="w-12 h-12" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{admin.hoTen}</p>
                                            <p className="text-sm text-gray-500">{admin.email}</p>
                                            <div className="flex items-center space-x-1 mt-1">
                                                <Shield className="w-3 h-3 text-[#2f19ae]" />
                                                <span className="text-xs text-[#2f19ae] font-medium">{admin.vaiTro}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {isLoggedIn ? (
                                    <>
                                        {userRole === "Admin" && (
                                            <li className="flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-[#2f19ae]/5 hover:to-purple-500/5 transition-all duration-200 group cursor-pointer">
                                                <User  className="h-5 w-5 text-gray-500 group-hover:text-[#2f19ae] transition-colors duration-200" />
                                                <Link 
                                                    to="/profile/user" 
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="ml-3 text-gray-700 group-hover:text-[#2f19ae] font-medium transition-colors duration-200 flex-1"
                                                >
                                                    Tài khoản của tôi
                                                </Link>
                                            </li>
                                        )}
                                        
                                        <li className="flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-[#2f19ae]/5 hover:to-purple-500/5 transition-all duration-200 group cursor-pointer">
                                            <Settings className="h-5 w-5 text-gray-500 group-hover:text-[#2f19ae] transition-colors duration-200" />
                                            <span className="ml-3 text-gray-700 group-hover:text-[#2f19ae] font-medium transition-colors duration-200">
                                                Cài đặt
                                            </span>
                                        </li>
                                        
                                        <li className="flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 group cursor-pointer border-t border-gray-100 mt-2">
                                            <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
                                            <button 
                                                onClick={handleAccount}
                                                className="ml-3 text-gray-700 group-hover:text-red-500 font-medium transition-colors duration-200 flex-1 text-left"
                                            >
                                                Đăng xuất
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li className="flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-[#2f19ae]/5 hover:to-purple-500/5 transition-all duration-200 group cursor-pointer">
                                        <LogIn className="w-5 h-5 text-gray-500 group-hover:text-[#2f19ae] transition-colors duration-200" />
                                        <Link 
                                            to="/login" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="ml-3 text-gray-700 group-hover:text-[#2f19ae] font-medium transition-colors duration-200"
                                        >
                                            Đăng nhập
                                        </Link>
                                    </li>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderAdmin;
