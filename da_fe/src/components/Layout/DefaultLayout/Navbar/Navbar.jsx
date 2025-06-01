import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../Assets/logo.png';
import cart_icon from '../../../Assets/cart_icon.png';
import user_icon from '../../../Assets/user_icon.png';
import { Avatar } from '@mui/material';
import { Edit, LogOut, LogIn, User } from 'react-feather';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [menu, setMenu] = useState('trangchu');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // 👉 Dữ liệu cứng giả lập user đăng nhập
    const isLoggedIn = true; // đổi thành false để mô phỏng người chưa đăng nhập
    const fakeUser = {
        username: 'Nguyễn Văn A',
        role: 'Customer', // hoặc 'Admin', 'User'
        avatar: user_icon,
    };

    const cartItemCount = 3; // dữ liệu cứng số lượng sản phẩm trong giỏ hàng

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
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
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đăng xuất",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                handleConfirm();
            }
        });
    };

    const handleConfirm = () => {
        console.log('Đăng xuất thành công');
        navigate('/');
    };

    return (
        <div className="flex justify-around shadow-md h-20">
            <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="w-[100px] h-[50px]" />
                <p className="text-[#171717] text-3xl font-semibold">5Shuttle</p>
            </div>
            <ul className="flex items-center list-none gap-8 text-[#292929] font-medium">
                <li onClick={() => setMenu('trangchu')} className="flex flex-col items-center gap-1 cursor-pointer py-3 text-[15px]">
                    <Link to="/">Trang chủ</Link>
                    {menu === 'trangchu' && <hr className="border-none w-full h-[3px] rounded-lg bg-[#2f19ae]" />}
                </li>
                <li onClick={() => setMenu('sanpham')} className="flex flex-col items-center gap-1 cursor-pointer py-3 text-[15px]">
                    <Link to="/san-pham">Sản phẩm</Link>
                    {menu === 'sanpham' && <hr className="border-none w-full h-[3px] rounded-lg bg-[#2f19ae]" />}
                </li>
                <li onClick={() => setMenu('gioithieu')} className="flex flex-col items-center gap-1 cursor-pointer py-3 text-[15px]">
                    <Link to="/gioi-thieu">Giới thiệu</Link>
                    {menu === 'gioithieu' && <hr className="border-none w-full h-[3px] rounded-lg bg-[#2f19ae]" />}
                </li>
                <li onClick={() => setMenu('tintuc')} className="flex flex-col items-center gap-1 cursor-pointer py-3 text-[15px]">
                    <Link to="/tin-tuc">Tin tức</Link>
                    {menu === 'tintuc' && <hr className="border-none w-full h-[3px] rounded-lg bg-[#2f19ae]" />}
                </li>
                <li onClick={() => setMenu('lienhe')} className="flex flex-col items-center gap-1 cursor-pointer py-3 text-[15px]">
                    <Link to="/lien-he">Liên hệ</Link>
                    {menu === 'lienhe' && <hr className="border-none w-full h-[3px] rounded-lg bg-[#2f19ae]" />}
                </li>
            </ul>

            <div className="flex items-center gap-10">
                <Link to="/gio-hang">
                    <div className="relative cursor-pointer">
                        <img src={cart_icon} alt="Cart Icon" className="w-8 h-8" />
                        <div className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-xs bg-red-600 text-white transform translate-x-1/2 -translate-y-1/2">
                            {cartItemCount}
                        </div>
                    </div>
                </Link>

                <div className='relative'>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative">
                        <Avatar src={fakeUser.avatar} alt="User Icon" className="w-10 h-8" />
                        {isMenuOpen && (
                            <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2 text-gray-700 z-50" ref={menuRef}>
                                {isLoggedIn ? (
                                    <>
                                        {fakeUser.role === "Customer" && (
                                            <li className="flex px-4 py-2 hover:bg-gray-100 space-x-3">
                                                <User className='h-5 w-5' />
                                                <Link to="/profile/user" onClick={() => setIsMenuOpen(false)}>Tài khoản của tôi</Link>
                                            </li>
                                        )}
                                        {(fakeUser.role === 'Admin' || fakeUser.role === 'User') && (
                                            <li className="flex px-4 py-2 hover:bg-gray-100 space-x-3">
                                                <Edit className="w-5 h-5" />
                                                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Trang quản lý</Link>
                                            </li>
                                        )}
                                        <li className="flex px-4 py-2 hover:bg-gray-100 space-x-3">
                                            <LogOut className='w-5 h-5' />
                                            <button onClick={handleAccount}>Đăng xuất</button>
                                        </li>
                                    </>
                                ) : (
                                    <li className="flex px-4 py-2 hover:bg-gray-100 space-x-3">
                                        <LogIn className='w-5 h-5' />
                                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Đăng nhập</Link>
                                    </li>
                                )}
                            </ul>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
