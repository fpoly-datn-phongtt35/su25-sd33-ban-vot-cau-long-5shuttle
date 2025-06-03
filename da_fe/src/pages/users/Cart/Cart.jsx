import React from 'react';
import CartItem from './CartItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cart = () => {
    const navigate = useNavigate(); // Khởi tạo hàm navigate

    // Hardcoded cart items data
    const carts = [
        {
            gioHang: {
                id: 1,
                soLuong: 2,
                sanPhamCT: {
                    id: 1,
                    ten: 'Product Name 1',
                    donGia: 50000,
                    soLuong: 10,
                    trongLuong: { ten: '1kg' },
                    thuongHieu: { ten: 'Brand Name 1' },
                },
            },
            link: 'https://via.placeholder.com/150', // Placeholder image
        },
        {
            gioHang: {
                id: 2,
                soLuong: 1,
                sanPhamCT: {
                    id: 2,
                    ten: 'Product Name 2',
                    donGia: 75000,
                    soLuong: 5,
                    trongLuong: { ten: '500g' },
                    thuongHieu: { ten: 'Brand Name 2' },
                },
            },
            link: 'https://via.placeholder.com/150', // Placeholder image
        },
    ];

    const handleCheckout = () => {
        navigate('/gio-hang/checkout'); // Chuyển hướng đến trang AddAddress
    };

    return (
        <div className="mt-10">
            <div className="lg:grid grid-cols-3 lg:px-16 relative">
                <div className="lg:col-span-2 lg:px-5 bg-white">
                    <div className="space-y-3">
                        {carts.map((cart) => (
                            <CartItem
                                key={cart.gioHang.id}
                                showButton={true}
                                cart={cart}
                                onQuantityChange={() => {}}
                                onDeleteCart={() => {}}
                            />
                        ))}
                    </div>
                </div>
                <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
                    <div className="border p-5 bg-white shadow-lg rounded-md">
                        <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
                        <hr />
                        <div className="space-y-3 font-semibold">
                            <hr />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Tổng tiền</span>
                                <span className="text-green-700">1.000.000 ₫</span>
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            onClick={handleCheckout} // Gọi hàm handleCheckout khi nhấn nút
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
