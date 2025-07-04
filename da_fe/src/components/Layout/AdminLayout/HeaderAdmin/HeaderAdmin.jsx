import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Notifications } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { LogOut, LogIn, User } from 'react-feather';
import Swal from 'sweetalert2';
import defaultAvatar from '../../../Assets/user_icon.png';

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return {};
    }
}

function HeaderAdmin() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("");

    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (token) {
            fetch("http://localhost:8080/shuttle/users/myInfo", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
                .then(res => {
                    if (!res.ok) throw new Error("Không thể lấy thông tin người dùng");
                    return res.json();
                })
                .then(data => {
                    setUser(data.result);
                    setIsLoggedIn(true);
                })
                .catch(err => {
                    console.error(err);
                    setIsLoggedIn(false);
                });


            let decoded;
            try {
                decoded = parseJwt(token);
                setRole(decoded.scope);
            } catch (e) {
                setRole("");
            }
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
    };

    const roleMap = {
        "ROLE_ADMIN": "Admin",
        "ROLE_USER": "Người dùng",
        "ROLE_Staff": "Nhân viên"
    };

    return (
        <header className="flex items-center justify-between w-full h-[70px] bg-white px-6 shadow-md">
            {/* Search Input */}
            <div className="flex items-center bg-gray-100 rounded-lg p-2 w-1/3">
                <Search className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="ml-2 w-full bg-transparent outline-none text-gray-700"
                />
            </div>

            {/* Notification Bell & User Info */}
            <div className="flex items-center space-x-5">
                <div className="relative cursor-pointer">
                    <Notifications className="w-24 h-24 text-gray-600" />
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-1 pr-5">
                    <div className="mr-4 text-center">
                        <p className="text-gray-800 text-base font-semibold">{user?.hoTen || "..."}</p>
                        <p className="text-gray-500 text-sm">-<span className="mx-1">{roleMap[role] || role || ""}</span>-</p>
                    </div>

                    <div className='relative'>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative">
                            <Avatar src={user?.avatar || defaultAvatar} alt="avatar" className="w-10 h-8" />
                            {isMenuOpen && (
                                <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2 text-gray-700 z-50" ref={menuRef}>
                                    {isLoggedIn ? (
                                        <>
                                            <li className="flex px-4 py-2 hover:bg-gray-100 space-x-3">
                                                <User className='h-5 w-5' />
                                                <Link to="/profile/user" onClick={() => setIsMenuOpen(false)}>Tài khoản của tôi</Link>
                                            </li>
                                            <li className="flex px-4 py-2 hover:bg-gray-100 space-x-3">
                                                <LogOut className='w-5 h-5' />
                                                <button onClick={handleAccount}>Đăng xuất</button>
                                            </li>
                                        </>
                                    ) : (
                                        <li className="flex px-4 py-2 hover:bg-gray-100 space-x-3">
                                            <LogIn className='w-5 h-5' />
                                            <Link to="/admin/login" onClick={() => setIsMenuOpen(false)}>Đăng nhập</Link>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderAdmin;