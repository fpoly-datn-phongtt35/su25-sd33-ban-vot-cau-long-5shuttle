import React, { useState, useEffect, useContext } from 'react';
import CartItem from './CartItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { CartContext } from './CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const [carts, setCarts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const idTaiKhoan = 1; // Lấy ID tài khoản thực tế (ví dụ từ auth context)

        const { setCartItemCount } = useContext(CartContext);
    

    useEffect(() => {
        fetchCart();
    }, []);

    

    const fetchCart = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/gio-hang/${idTaiKhoan}`);
            setCarts(res.data);
            const totalRes = await axios.get(`http://localhost:8080/api/gio-hang/${idTaiKhoan}/total`);
            setTotalPrice(totalRes.data);
        } catch (error) {
            console.error('Lỗi lấy giỏ hàng:', error);
        }
    };

    const handleQuantityChange = async (cartId, newQuantity) => {
        try {
            await axios.put(`http://localhost:8080/api/gio-hang/${cartId}`, { soLuong: newQuantity });
            // Update local state
            setCarts(carts.map(c => (c.id === cartId ? { ...c, soLuong: newQuantity } : c)));
            const totalRes = await axios.get(`http://localhost:8080/api/gio-hang/${idTaiKhoan}/total`);
            setTotalPrice(totalRes.data);
             const countResponse = await axios.get(`http://localhost:8080/api/gio-hang/${idTaiKhoan}/count`);
            setCartItemCount(countResponse.data); // Cập nhật số lượng giỏ hàng
        } catch (error) {
            swal('Lỗi', 'Không thể cập nhật số lượng sản phẩm.', 'error');
            console.error(error);
        }
    };

    const handleDeleteCart = async (cartId) => {
        try {
            await axios.delete(`http://localhost:8080/api/gio-hang/${cartId}`);
            setCarts(carts.filter(c => c.id !== cartId));
            const totalRes = await axios.get(`http://localhost:8080/api/gio-hang/${idTaiKhoan}/total`);
            setTotalPrice(totalRes.data);
            swal('Thành công', 'Đã xóa sản phẩm khỏi giỏ hàng.', 'success');
        } catch (error) {
            swal('Lỗi', 'Không thể xóa sản phẩm.', 'error');
            console.error(error);
        }
    };

    const handleCheckout = () => {
        navigate('/gio-hang/checkout');
    };

    return (
        <div className="mt-10">
            <div className="lg:grid grid-cols-3 lg:px-16 relative">
                <div className="lg:col-span-2 lg:px-5 bg-white">
                    <div className="space-y-3">
                        {carts.map(cart => (
                            <CartItem
                                key={cart.id}
                                cart={cart}
                                showButton={true}
                                onQuantityChange={handleQuantityChange}
                                onDeleteCart={handleDeleteCart}
                            />
                        ))}
                    </div>
                </div>
                <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
                    <div className="border p-5 bg-white shadow-lg rounded-md">
                        <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
                        <hr />
                        <div className="space-y-3 font-semibold">
                            <hr />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Tổng tiền</span>
                                <span className="text-green-700">{totalPrice.toLocaleString()} ₫</span>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            onClick={handleCheckout}
                            sx={{
                                padding: '.8rem 2rem',
                                marginTop: '2rem',
                                width: '100%',
                                backgroundColor: '#2f19ae',
                                '&:hover': { backgroundColor: '#271693' },
                            }}
                        >
                            Check Out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
