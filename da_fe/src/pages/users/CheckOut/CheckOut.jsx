import React, { useState } from 'react';

const CheckOut = () => {
    const [addressList, setAddressList] = useState([
        { sdt: '0123456789', name: 'Nguyễn Văn A', detail: '123 Đường ABC, Phường 1', province: '1', district: '1', ward: '1' },
        { sdt: '0987654321', name: 'Trần Thị B', detail: '456 Đường DEF, Phường 2', province: '2', district: '2', ward: '2' },
    ]);
    const [provinces] = useState([
        { ProvinceID: '1', ProvinceName: 'TP.HCM' },
        { ProvinceID: '2', ProvinceName: 'Hà Nội' },
    ]);
    const [districts] = useState([
        { DistrictID: '1', DistrictName: 'Quận 1' },
        { DistrictID: '2', DistrictName: 'Quận Hoàn Kiếm' },
    ]);
    const [wards] = useState([
        { WardCode: '1', WardName: 'Phường Bến Nghé' },
        { WardCode: '2', WardName: 'Phường Hàng Bạc' },
    ]);

    const [formData, setFormData] = useState({
        addressName: '',
        addressDetail: '',
        province: '',
        district: '',
        ward: '',
        mobile: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: false
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.addressName.trim()) newErrors.addressName = true;
        if (!formData.addressDetail.trim()) newErrors.addressDetail = true;
        if (!formData.province) newErrors.province = true;
        if (!formData.district) newErrors.district = true;
        if (!formData.ward) newErrors.ward = true;
        if (!formData.mobile.trim()) newErrors.mobile = true;
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const exists = addressList.some(addr => addr.sdt === formData.mobile);
        if (exists) {
            alert('Số điện thoại đã tồn tại trong danh sách địa chỉ.');
            return;
        }
        
        const newAddress = {
            sdt: formData.mobile,
            name: formData.addressName,
            detail: formData.addressDetail,
            province: formData.province,
            district: formData.district,
            ward: formData.ward,
        };
        
        setAddressList(prev => [...prev, newAddress]);
        setFormData({
            addressName: '',
            addressDetail: '',
            province: '',
            district: '',
            ward: '',
            mobile: ''
        });
    };

    const orderItems = [
        {
            id: 1,
            name: 'Vợt cầu lông Yonex nanoflare 700 pro',
            price: 100000,
            quantity: 2,
            color: 'Đỏ',
            weight: '4U',
            image: 'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-nanoflare-700-pro-chinh-hang_1727042472.webp',
        },
        {
            id: 2,
            name: 'Vợt cầu lông Yonex nanoflare 1000z',
            price: 150000,
            quantity: 1,
            color: 'Xanh',
            weight: '3U',
            image: 'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-nanoflare-1000z-chinh-hang_1724879816.webp',
        },
    ];

    const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2f19ae] via-[#4c2eb5] to-[#6b46c1] py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Thanh Toán</h1>
                    <p className="text-blue-100">Hoàn tất đơn hàng của bạn</p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Side - Address Form */}
                        <div className="lg:col-span-7">
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                                <div className="flex items-center mb-6">
                                    <div className="w-8 h-8 bg-[#2f19ae] rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white font-bold">1</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Thông tin giao hàng</h2>
                                </div>
                                
                                <div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Họ và tên *
                                            </label>
                                            <input
                                                type="text"
                                                name="addressName"
                                                value={formData.addressName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2f19ae] focus:ring-4 focus:ring-[#2f19ae]/20 transition-all duration-300 outline-none"
                                                placeholder="Nhập họ và tên"
                                            />
                                            {errors.addressName && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <span className="mr-1">⚠️</span> Họ và tên là bắt buộc
                                                </p>
                                            )}
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Địa chỉ chi tiết *
                                            </label>
                                            <input
                                                type="text"
                                                name="addressDetail"
                                                value={formData.addressDetail}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2f19ae] focus:ring-4 focus:ring-[#2f19ae]/20 transition-all duration-300 outline-none"
                                                placeholder="Số nhà, tên đường..."
                                            />
                                            {errors.addressDetail && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <span className="mr-1">⚠️</span> Địa chỉ là bắt buộc
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Tỉnh/Thành phố *
                                            </label>
                                            <select
                                                name="province"
                                                value={formData.province}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2f19ae] focus:ring-4 focus:ring-[#2f19ae]/20 transition-all duration-300 outline-none"
                                            >
                                                <option value="">Chọn tỉnh/thành phố</option>
                                                {provinces.map((province) => (
                                                    <option key={province.ProvinceID} value={province.ProvinceID}>
                                                        {province.ProvinceName}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.province && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <span className="mr-1">⚠️</span> Tỉnh/thành phố là bắt buộc
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Quận/Huyện *
                                            </label>
                                            <select
                                                name="district"
                                                value={formData.district}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2f19ae] focus:ring-4 focus:ring-[#2f19ae]/20 transition-all duration-300 outline-none"
                                            >
                                                <option value="">Chọn quận/huyện</option>
                                                {districts.map((district) => (
                                                    <option key={district.DistrictID} value={district.DistrictID}>
                                                        {district.DistrictName}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.district && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <span className="mr-1">⚠️</span> Quận/huyện là bắt buộc
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Xã/Phường *
                                            </label>
                                            <select
                                                name="ward"
                                                value={formData.ward}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2f19ae] focus:ring-4 focus:ring-[#2f19ae]/20 transition-all duration-300 outline-none"
                                            >
                                                <option value="">Chọn xã/phường</option>
                                                {wards.map((ward) => (
                                                    <option key={ward.WardCode} value={ward.WardCode}>
                                                        {ward.WardName}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.ward && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <span className="mr-1">⚠️</span> Xã/phường là bắt buộc
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Số điện thoại *
                                            </label>
                                            <input
                                                type="text"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2f19ae] focus:ring-4 focus:ring-[#2f19ae]/20 transition-all duration-300 outline-none"
                                                placeholder="Nhập số điện thoại"
                                            />
                                            {errors.mobile && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <span className="mr-1">⚠️</span> Số điện thoại là bắt buộc
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="mt-6 w-full bg-gradient-to-r from-[#2f19ae] to-[#4c2eb5] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#251589] hover:to-[#3d2491] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        💾 Lưu địa chỉ
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Order Summary */}
                        <div className="lg:col-span-5">
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 sticky top-4">
                                <div className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="w-8 h-8 bg-[#2f19ae] rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white font-bold">2</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800">Đơn hàng của bạn</h2>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        {orderItems.map(item => (
                                            <div key={item.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-300">
                                                <div className="flex items-start space-x-4">
                                                    <div className="relative">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name} 
                                                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                                                        />
                                                        <span className="absolute -top-2 -right-2 bg-[#2f19ae] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                                                            {item.quantity}
                                                        </span>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.name}</h3>
                                                        <div className="space-y-1 text-xs text-gray-600">
                                                            <p>💰 Giá: <span className="font-semibold">{item.price.toLocaleString()} VNĐ</span></p>
                                                            <p>🎨 Màu: <span className="font-semibold">{item.color}</span></p>
                                                            <p>⚖️ Trọng lượng: <span className="font-semibold">{item.weight}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-[#2f19ae]">
                                                            {(item.price * item.quantity).toLocaleString()} VNĐ
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-200 pt-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-xl font-bold text-gray-800">Tổng tiền:</span>
                                            <span className="text-2xl font-bold text-[#2f19ae]">
                                                {totalAmount.toLocaleString()} VNĐ
                                            </span>
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Phương thức thanh toán</h3>
                                            <div className="space-y-3">
                                                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                                                    🚚 Thanh toán khi nhận hàng
                                                </button>
                                                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                                                    💳 Thanh toán qua VNPay
                                                </button>
                                            </div>
                                        </div>

                                        <button className="w-full bg-gradient-to-r from-[#2f19ae] to-[#4c2eb5] text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-[#251589] hover:to-[#3d2491] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl">
                                            🛒 Hoàn tất đơn hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;