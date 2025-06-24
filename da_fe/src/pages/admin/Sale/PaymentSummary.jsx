import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const PaymentSummary = ({ total, selectedBill }) => {
    const [payment, setPayment] = useState(0);
    const [remaining, setRemaining] = useState(total);
    const [voucherId, setVoucherId] = useState(null); // Thêm biến trạng thái cho voucher

    useEffect(() => {
        setRemaining(total - payment);
    }, [payment, total]);

    const handlePaymentChange = (e) => {
        // Lấy giá trị từ input và loại bỏ các ký tự không phải số
        const value = e.target.value.replace(/[^0-9]/g, '');
        const numericValue = parseFloat(value) || 0;

        setPayment(numericValue);
    };

    const handleConfirmOrder = async () => {
        if (payment < total) {
            Swal.fire({
                icon: 'warning',
                title: 'Cảnh báo',
                text: 'Số tiền thanh toán không đủ!',
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/hoa-don/thanh-toan', {
                idHoaDon: selectedBill.id, // Lấy từ state
                tongTien: total,
                khachThanhToan: payment,
                idVoucher: voucherId, // Nếu có
                phuongThucThanhToan: "Tiền mặt" // Hoặc từ dropdown
            });

            Swal.fire({
                icon: 'success',
                title: 'Thanh toán thành công',
                text: `Hóa đơn #${response.data.ma} đã được xác nhận`
            });

            // Cập nhật UI hoặc chuyển hướng
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: error.response?.data?.message || 'Có lỗi xảy ra khi thanh toán'
            });
        }
    };

    return (
        <div className="h-115 bg-white rounded-lg shadow-sm overflow-hidden mt-[20px]">
            <div className="flex h-full">
                {/* Customer Section */}
                <div className="flex-1 p-6 border-r border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Khách hàng</h3>
                        <button className="text-[#2f19ae] text-sm border border-[#2f19ae] px-3 py-1 rounded hover:bg-purple-50 transition-colors">
                            CHỌN KHÁCH HÀNG
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Phiếu giảm giá</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Nhập phiếu giảm giá"
                                onChange={(e) => setVoucherId(e.target.value)} // Cập nhật voucherId
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Phần trăm giảm</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue="15%"
                                disabled // Nếu không cần chỉnh sửa
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Summary Section */}
                <div className="w-96 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Thanh toán</h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Tiền hàng</span>
                            <span className="font-medium">{total.toLocaleString()} VNĐ</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Phí vận chuyển</span>
                            <span className="font-medium">0 VND</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Giảm giá</span>
                            <span className="font-medium text-green-600">0 VND</span>
                        </div>

                        <hr className="border-gray-200 my-3" />

                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800">Tổng số tiền</span>
                            <span className="font-bold text-lg text-red-600">{total.toLocaleString()} VNĐ</span>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-600 mb-2">Khách thanh toán</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={payment.toLocaleString()} // Định dạng tiền
                                    onChange={handlePaymentChange}
                                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-right mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0"
                                />
                                <span className="text-sm font-medium text-gray-600">VND</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <span className="font-semibold text-gray-800">Tiền thiếu</span>
                            <span className="font-bold text-red-600">{remaining.toLocaleString()} VND</span>
                        </div>

                        <button 
                            onClick={handleConfirmOrder}
                            className="w-full bg-[#2f19ae] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#2f19aed6] transition-colors mt-4"
                        >
                            XÁC NHẬN ĐẶT HÀNG
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSummary;
