import React, { useState } from 'react';
import { CheckCircle, Clock, Package, Truck, CreditCard, XCircle, RotateCcw, AlertCircle } from 'lucide-react';
import { Plus, Minus, ShoppingCart, Star, Heart } from 'lucide-react';
import { Calculator, Percent, Receipt } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function OrderStatus() {
    const [currentOrderStatus, setCurrentOrderStatus] = useState(3); // Trạng thái hiện tại của đơn hàng
    const [isPaid, setIsPaid] = useState(false); // Trạng thái thanh toán

    const [quantity, setQuantity] = useState(4);
    const [isLiked, setIsLiked] = useState(false);

    const [discountCode, setDiscountCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);

    const subtotal = 137500;
    const discountAmount = (subtotal * discountPercent) / 100;

    
    const updateQuantity = async (orderDetailId, newQuantity) => {
        try {
            const response = await fetch(`http://localhost:8080/api/hoa-don-ct/update-quantity/${orderDetailId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ soLuong: newQuantity }),
            });

            if (!response.ok) {
                throw new Error('Không thể cập nhật số lượng');
            }

            // Cập nhật số lượng trong orderDetailDatas
            const updatedOrderDetails = orderDetailDatas.map((item) => {
                if (item.id === orderDetailId) {
                    return {
                        ...item,
                        soLuong: newQuantity,
                        giaBan: item.sanPhamCT.donGia * newQuantity,
                    };
                }
                return item;
            });

            setOrderDetailDatas(updatedOrderDetails);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleQuantityChange = async (delta, orderDetailId) => {
        const newQuantity = Math.max(1, quantity + delta);
        await updateQuantity(orderDetailId, newQuantity);
        setQuantity(newQuantity);
    };

    const location = useLocation();
    const orderData = location.state?.order || {}; // Lấy dữ liệu đơn hàng từ state
    // const orderDetailDatas = location.state?.orderDetails || {};
    const [orderDetailDatas, setOrderDetailDatas] = useState(location.state?.orderDetails || []);

    const calculateTotalAmount = () => {
    const shippingFee = 30000; // Phí ship mặc định
    const totalAmount = orderDetailDatas.reduce((total, orderDetail) => {
        return total + (orderDetail.sanPhamCT.donGia * orderDetail.soLuong); // Cộng giá bán của từng sản phẩm
    }, 0);
    return totalAmount + shippingFee; // Cộng phí ship
};
 const total = calculateTotalAmount();


    const paymentHistory = [
        {
            amount: '835.253 đ',
            date: '21-12-2023 14:34:23',
            paymentType: 'Thanh toán',
            transferType: 'Tiền mặt',
            status: 'Thành công',
            confirmedBy: 'Nguyễn Văn Nhật',
        },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Hoàn thành':
                return 'bg-purple-100 text-purple-700 border border-purple-300';
            case 'Giao hàng':
                return 'bg-blue-100 text-blue-700 border border-blue-300';
            case 'Thanh toán':
                return 'bg-blue-100 text-blue-700 border border-blue-300';
            case 'Tiền mặt':
                return 'bg-orange-100 text-orange-700 border border-orange-300';
            case 'Thành công':
                return 'bg-green-100 text-green-700 border border-green-300';
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-300';
        }
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 1:
                return { label: 'Chờ xác nhận', color: '#ebd534', icon: Clock };
            case 2:
                return { label: 'Chờ giao hàng', color: '#34e5eb', icon: Package };
            case 3:
                return { label: 'Đang vận chuyển', color: '#345feb', icon: Truck };
            case 4:
                return { label: 'Đã giao hàng', color: '#e342f5', icon: CheckCircle };
            case 5:
                return { label: 'Đã thanh toán', color: '#42f5e0', icon: CreditCard };
            case 6:
                return { label: 'Chờ thanh toán', color: '#f58d42', icon: CreditCard };
            case 7:
                return { label: 'Hoàn thành', color: '#4caf50', icon: CheckCircle };
            case 8:
                return { label: 'Đã hủy', color: '#f5425d', icon: XCircle };
            case 9:
                return { label: 'Trả hàng', color: '#f54278', icon: RotateCcw };
            default:
                return { label: 'Không xác định', color: '#f54278', icon: AlertCircle };
        }
    };

    const getActionButtonText = (status) => {
        switch (status) {
            case 1:
                return 'Xác nhận đơn hàng';
            case 2:
                return 'Xác nhận giao hàng';
            case 3:
                return 'Xác nhận lấy hàng';
            case 4:
                return isPaid ? 'Hoàn thành' : 'Thanh toán';
            case 5:
                return 'Hoàn thành';
            case 6:
                return 'Đơn hàng đã hoàn thành';
            case 7:
                return 'Đơn hàng đã hoàn thành';
            case 8:
                return 'Đơn hàng đã hủy';
            case 9:
                return 'Đơn hàng đã trả';
            default:
                return 'Không xác định';
        }
    };

    const shouldShowActionButton = (status) => {
        return status !== 7 && status !== 8 && status !== 9;
    };

    const getActionButtonStyle = (status) => {
        if (status === 4 && !isPaid) {
            return 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700';
        }
        if (status === 6) {
            return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed';
        }
        return 'text-blue-600 border-2 border-blue-300 hover:bg-blue-50';
    };

    const generateTimeline = (currentStatus) => {
        const timeline = [];
        const baseTime = new Date('2023-12-21T13:48:17');

        if (currentStatus >= 1) {
            timeline.push({
                status: 1,
                time: baseTime.toLocaleString('vi-VN'),
                completed: true,
            });
        }

        if (currentStatus >= 2) {
            const time2 = new Date(baseTime.getTime() + 4 * 60 * 1000);
            timeline.push({
                status: 2,
                time: time2.toLocaleString('vi-VN'),
                completed: true,
            });
        }

        if (currentStatus >= 3) {
            const time3 = new Date(baseTime.getTime() + 8 * 60 * 1000);
            timeline.push({
                status: 3,
                time: time3.toLocaleString('vi-VN'),
                completed: currentStatus > 3,
                current: currentStatus === 3,
            });
        }

        if (currentStatus >= 4) {
            const time4 = new Date(baseTime.getTime() + 24 * 60 * 60 * 1000);
            timeline.push({
                status: 4,
                time: time4.toLocaleString('vi-VN'),
                completed: currentStatus > 4,
                current: currentStatus === 4,
            });
        }

        if (currentStatus >= 5) {
            const time5 = new Date(baseTime.getTime() + 25 * 60 * 60 * 1000);
            timeline.push({
                status: 5,
                time: time5.toLocaleString('vi-VN'),
                completed: currentStatus > 5,
                current: currentStatus === 5,
            });
        }

        if (currentStatus === 6) {
            timeline.push({
                status: 6,
                time: 'Đang chờ...',
                completed: false,
                current: true,
            });
        }

        if (currentStatus === 7) {
            const time7 = new Date(baseTime.getTime() + 48 * 60 * 60 * 1000);
            timeline.push({
                status: 7,
                time: time7.toLocaleString('vi-VN'),
                completed: true,
                current: false,
            });
        }

        if (currentStatus === 8) {
            const time8 = new Date();
            timeline.push({
                status: 8,
                time: time8.toLocaleString('vi-VN'),
                completed: true,
                current: false,
            });
        }

        if (currentStatus === 9) {
            const time9 = new Date();
            timeline.push({
                status: 9,
                time: time9.toLocaleString('vi-VN'),
                completed: true,
                current: false,
            });
        }

        return timeline;
    };

    const timeline = generateTimeline(currentOrderStatus);
    const progressPercentage =
        timeline.length > 0 ? (timeline.filter((step) => step.completed).length / timeline.length) * 100 : 0;

    return (
        <>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Lịch sử đơn hàng
                    </h2>

                    {/* Status Selector for Demo */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Trạng thái:</span>
                            <select
                                value={currentOrderStatus}
                                onChange={(e) => setCurrentOrderStatus(parseInt(e.target.value))}
                                className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((status) => (
                                    <option key={status} value={status}>
                                        {getStatusInfo(status).label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {currentOrderStatus === 4 && (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="isPaid"
                                    checked={isPaid}
                                    onChange={(e) => setIsPaid(e.target.checked)}
                                    className="rounded"
                                />
                                <label htmlFor="isPaid" className="text-sm text-gray-600">
                                    Đã thanh toán
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-12">
                    <div className="flex items-center justify-between">
                        {timeline.map((step, index) => {
                            const statusInfo = getStatusInfo(step.status);
                            const IconComponent = statusInfo.icon;

                            return (
                                <div key={step.status} className="flex flex-col items-center relative z-10 flex-1">
                                    {/* Icon with animated glow */}
                                    <div
                                        className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-all duration-500 ${
                                            step.current ? 'scale-110 animate-pulse' : 'scale-100'
                                        }`}
                                        style={{
                                            backgroundColor: statusInfo.color,
                                            boxShadow: step.current
                                                ? `0 0 20px ${statusInfo.color}40`
                                                : `0 4px 15px ${statusInfo.color}20`,
                                        }}
                                    >
                                        <IconComponent className="w-10 h-10 text-white" />
                                    </div>

                                    {/* Step Info */}
                                    <div className="text-center max-w-32">
                                        <div
                                            className={`font-semibold mb-2 ${step.current ? 'text-gray-900' : 'text-gray-700'}`}
                                        >
                                            {statusInfo.label}
                                        </div>
                                        <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {step.time}
                                        </div>
                                    </div>

                                    {/* Connector Line */}
                                    {index < timeline.length - 1 && (
                                        <div
                                            className="absolute top-10 left-full w-full h-1 -translate-x-1/2 transition-all duration-700"
                                            style={{
                                                background: step.completed
                                                    ? `linear-gradient(to right, ${statusInfo.color}, ${getStatusInfo(timeline[index + 1].status).color})`
                                                    : '#e5e7eb',
                                                zIndex: -1,
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Tiến độ đơn hàng</span>
                        <span className="text-sm font-medium text-gray-700">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    {shouldShowActionButton(currentOrderStatus) ? (
                        <button
                            className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium ${getActionButtonStyle(currentOrderStatus)}`}
                            disabled={currentOrderStatus === 6}
                            onClick={() => {
                                if (currentOrderStatus === 4 && !isPaid) {
                                    setIsPaid(true);
                                } else if (currentOrderStatus < 7) {
                                    setCurrentOrderStatus(currentOrderStatus + 1);
                                }
                            }}
                        >
                            {getActionButtonText(currentOrderStatus)}
                        </button>
                    ) : (
                        <div className="px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-medium cursor-default">
                            {getActionButtonText(currentOrderStatus)}
                        </div>
                    )}

                    <div className="flex items-center space-x-4">
                        {(currentOrderStatus === 1 || currentOrderStatus === 2 || currentOrderStatus === 3) && (
                            <button className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium">
                                Hủy đơn
                            </button>
                        )}

                        <button className="text-purple-600 hover:text-purple-800 transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-purple-50">
                            Chi tiết →
                        </button>
                    </div>
                </div>

                {/* Current Status Badge */}
                <div className="mt-6 text-center">
                    <div
                        className="inline-flex items-center px-6 py-3 rounded-full text-white font-semibold shadow-lg"
                        style={{ backgroundColor: getStatusInfo(currentOrderStatus).color }}
                    >
                        <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse" />
                        Trạng thái hiện tại: {getStatusInfo(currentOrderStatus).label}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-5xl mx-auto mt-8">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
                    <h2 className="text-lg font-medium text-gray-800">Thông tin đơn hàng - Đơn tại quầy</h2>
                </div>

                {/* Order Information */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
                        <div className="flex flex-wrap md:flex-nowrap gap-4 mb-2">
                            <div className="flex items-center flex-shrink-0 min-w-[30px]  font-semibold text-gray-600">
                                Mã:
                            </div>
                            <div className="flex-1 min-w-0 text-gray-900 truncate whitespace-nowrap">
                                {orderData.ma}
                            </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap gap-4 mb-2">
                            <div className="flex items-center flex-shrink-0 min-w-[120px] font-semibold text-gray-600">
                                Số người nhận:
                            </div>
                            <div className="flex-1 min-w-0 text-gray-900 truncate whitespace-nowrap">
                                {orderData.sdtNguoiNhan}
                            </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap gap-4 mb-2">
                            <div className="flex items-center flex-shrink-0 min-w-[120px] font-semibold text-gray-600">
                                Tên khách hàng:
                            </div>
                            <div className="flex-1 min-w-0 text-gray-900 truncate whitespace-nowrap">
                                {/* {orderData.taiKhoan.ten} */}
                            </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap gap-4 mb-2">
                            <div className="flex items-center flex-shrink-0 min-w-[30px] font-semibold text-gray-600">
                                Loại:
                            </div>
                            <div className="flex-1 min-w-0">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(orderData.deliveryType)} whitespace-nowrap`}
                                >
                                    {orderData.loaiHoaDon}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap gap-4 mb-2">
                            <div className="flex items-center flex-shrink-0 min-w-[120px] font-semibold text-gray-600">
                                Trạng thái:
                            </div>
                            <div className="flex-1 min-w-0">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(orderData.status)} whitespace-nowrap`}
                                >
                                    {orderData.trangThai}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap gap-4 mb-2">
                            <div className="flex items-center flex-shrink-0 min-w-[120px] font-semibold text-gray-600">
                                Tên người nhận:
                            </div>
                            <div className="flex-1 min-w-0 text-gray-900 truncate whitespace-nowrap">
                                {orderData.tenNguoiNhan}
                            </div>
                        </div>
                    </div>

                    {/* Payment History Section */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Lịch sử thanh toán</h3>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                                            Số tiền
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                                            Thời gian
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                                            Loại giao dịch
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                                            PTTT
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                                            Trạng thái
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                                            Ghi chú
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                                            Nhân viên xác nhận
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentHistory.map((payment, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-100">
                                                {payment.amount}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-100">
                                                {payment.date}
                                            </td>
                                            <td className="px-4 py-4 text-sm border-b border-gray-100">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(payment.paymentType)}`}
                                                >
                                                    {payment.paymentType}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm border-b border-gray-100">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(payment.transferType)}`}
                                                >
                                                    {payment.transferType}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm border-b border-gray-100">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(payment.status)}`}
                                                >
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-100">
                                                -
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-100">
                                                {payment.confirmedBy}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 p-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">Danh sách sản phẩm</h1>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2">
                                <Plus size={18} />
                                Thêm sản phẩm
                            </button>
                        </div>

                        {/* Product Card */}
                        {orderDetailDatas.map((orderDetail) => (
                            <div
                                key={orderDetail.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-2"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-6">
                                        {/* Product Image */}
                                        <div className="relative group">
                                            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={orderDetail.hinhAnhUrl}
                                                    alt={orderDetail.hinhAnhUrl}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button
                                                onClick={() => setIsLiked(!isLiked)}
                                                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                                            >
                                                <Heart
                                                    size={16}
                                                    className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'} transition-colors duration-200`}
                                                />
                                            </button>
                                        </div>
                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                                        {orderDetail.sanPhamCT.ten}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-sm text-red-500 ">
                                                            {orderDetail.sanPhamCT.donGia.toLocaleString()} VNĐ
                                                        </span>
                                                        {/* sau này khi xong giảm giá cần dùng đến (Tạm thời thì chưa) */}
                                                        {/* <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                                                            -11%
                                                        </span> */}
                                                    </div>
                                                    <div className="flex items-center gap-1 mb-3">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={14}
                                                                className={`${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                        <span className="text-sm text-gray-500 ml-1">(4.0)</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        Màu sắc:{' '}
                                                        <span className="font-medium">
                                                            {orderDetail.sanPhamCT.mauSac.ten}
                                                        </span>
                                                    </p>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        Trọng lượng:{' '}
                                                        <span className="font-medium">
                                                            {orderDetail.sanPhamCT.trongLuong.ten}
                                                        </span>
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                            Còn hàng
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {orderDetail.stock}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-red-600 mb-4">
                                                        {orderDetail.giaBan.toLocaleString()} VNĐ
                                                    </div>
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <button
                                                            onClick={() => handleQuantityChange(-1, orderDetail.id)}
                                                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center font-medium text-lg">
                                                            {orderDetail.soLuong}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(1, orderDetail.id)}
                                                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Additional Product Cards */}
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                            <div className="flex items-center gap-3">
                                <Receipt className="w-8 h-8" />
                                <h2 className="text-2xl font-bold">Chi tiết thanh toán</h2>
                            </div>
                        </div>

                        {/* Content - Horizontal Layout */}
                        <div className="p-8">
                            {/* Main Horizontal Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                                {/* Discount Code Section */}
                                <div className="lg:col-span-1">
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 h-full">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Percent className="w-5 h-5 text-purple-600" />
                                            <h3 className="font-semibold text-gray-800">Mã giảm giá</h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phiếu giảm giá:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={discountCode}
                                                    onChange={(e) => setDiscountCode(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                                                    placeholder="Nhập mã"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Giảm giá (%):
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        value={discountPercent}
                                                        onChange={(e) =>
                                                            setDiscountPercent(
                                                                Math.max(0, Math.min(100, e.target.value)),
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                                                        placeholder="0"
                                                        min="0"
                                                        max="100"
                                                    />
                                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Section */}
                                <div className="lg:col-span-3 grid grid-cols-1 gap-6">
                                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-100 h-full">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Calculator className="w-5 h-5 text-orange-600" />
                                            <h3 className="font-semibold text-gray-800">Tóm tắt</h3>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-700">Tổng tiền hàng:</span>
                                                <span className="font-semibold text-gray-900">
                                                    {(total - 30000).toLocaleString()} VNĐ
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-700">Giảm giá:</span>
                                                <span className="font-semibold text-red-600">
                                                    -{discountAmount.toLocaleString()} VNĐ
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center text-sm border-b border-orange-200 pb-2">
                                                <span className="text-gray-700">Phí vận chuyển:</span>
                                                <span className="font-semibold text-gray-900">+30.000 VNĐ</span>
                                            </div>

                                            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-3 mt-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-white font-bold">Tổng tiền:</span>
                                                    <span className="text-white font-bold text-lg">
                                                        {total.toLocaleString()} VNĐ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderStatus;
