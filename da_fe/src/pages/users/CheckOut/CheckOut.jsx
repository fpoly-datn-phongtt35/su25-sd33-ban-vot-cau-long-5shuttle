import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const CheckOut = () => {
    const [carts, setCarts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const idTaiKhoan = 1;

    // const [addressList, setAddressList] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        addressName: '',
        addressDetail: '',
        province: '',
        district: '',
        ward: '',
        mobile: '',
    });
    const [errors, setErrors] = useState({});

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

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

    const fetchProvinces = async () => {
        try {
            const res = await axios.get('https://provinces.open-api.vn/api/');
            setProvinces(res.data);
        } catch (error) {
            console.error('Lỗi lấy danh sách tỉnh:', error);
        }
    };

    const fetchDistricts = async (provinceCode) => {
        if (!provinceCode) return;
        try {
            const res = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
            if (res.data && res.data.districts) {
                setDistricts(res.data.districts);
            }
        } catch (error) {
            console.error('Lỗi lấy danh sách quận/huyện:', error);
        }
    };

    const fetchWards = async (districtCode) => {
        if (!districtCode) return;
        try {
            const res = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            if (res.data && res.data.wards) {
                setWards(res.data.wards);
            }
        } catch (error) {
            console.error('Lỗi lấy danh sách xã/phường:', error);
        }
    };

    useEffect(() => {
        fetchCart();
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (formData.province) {
            fetchDistricts(formData.province);
        }
    }, [formData.province]);

    useEffect(() => {
        if (formData.district) {
            fetchWards(formData.district);
        }
    }, [formData.district]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: false,
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

    const handleSubmit = async () => {
        if (!validateForm()) return;

        if (!selectedPaymentMethod) {
            swal('Lỗi', 'Vui lòng chọn phương thức thanh toán.', 'error');
            return;
        }

        if (selectedPaymentMethod === 'cash') {
            const newAddress = {
                sdt: formData.mobile,
                hoTen: formData.addressName,
                diaChiCuThe: formData.addressDetail,
                province: formData.province,
                district: formData.district,
                ward: formData.ward,
            };

            const orderData = {
                idTaiKhoan: idTaiKhoan,
                cartItems: carts.map((item) => ({
                    sanPhamCTId: item.sanPhamCT.id,
                    soLuong: item.soLuong,
                })),
                thongTinGiaoHang: newAddress,
            };
            console.log('blablaa: ', orderData);

            try {
                const response = await axios.post('http://localhost:8080/api/dat-hang', orderData);
                if (response.status === 200) {
                    swal('Thành công', 'Đặt hàng thành công!', 'success').then(async () => {
                        // Xóa giỏ hàng sau khi đặt hàng thành công
                        await axios.delete(`http://localhost:8080/api/gio-hang/xoa/${idTaiKhoan}`);
                        navigate('/xac-nhan-don-hang');
                    });
                }
            } catch (error) {
                console.error('Lỗi đặt hàng:', error);
                swal('Lỗi', 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.', 'error');
            }
        } else {
            swal('Thông báo', 'Chức năng thanh toán qua VNPay chưa được triển khai.', 'info');
        }
    };

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
                                                    <option key={province.code} value={province.code}>
                                                        {province.name}
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
                                                    <option key={district.code} value={district.code}>
                                                        {district.name}
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
                                                    <option key={ward.code} value={ward.code}>
                                                        {ward.name}
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
                                        <button
                                            onClick={() => navigate('/gio-hang')} // Sử dụng navigate thay vì history.push
                                            className="ml-4 bg-[#19aea4] text-white py-2 px-4 rounded-lg flex items-center"
                                        >
                                            <span className="mr-2">✏️</span> Sửa giỏ hàng
                                        </button>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        {carts.map((item) => (
                                            <div
                                                key={item.id}
                                                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-300"
                                            >
                                                <div className="flex items-start space-x-4">
                                                    <div className="relative">
                                                        <img
                                                            src={item.hinhAnhUrl}
                                                            alt={item.soLuong}
                                                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                                                        />
                                                        <span className="absolute -top-2 -right-2 bg-[#2f19ae] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                                                            {item.soLuong}
                                                        </span>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h3 className="font-semibold text-gray-800 text-sm mb-1">
                                                            {item.sanPhamCT.ten}
                                                        </h3>
                                                        <div className="space-y-1 text-xs text-gray-600">
                                                            <p>
                                                                💰 Giá:{' '}
                                                                <span className="font-semibold">
                                                                    {item.sanPhamCT.donGia.toLocaleString()} VNĐ
                                                                </span>
                                                            </p>
                                                            <p>
                                                                🎨 Màu:{' '}
                                                                <span className="font-semibold">
                                                                    {item.sanPhamCT.mauSac.ten}
                                                                </span>
                                                            </p>
                                                            <p>
                                                                ⚖️ Trọng lượng:{' '}
                                                                <span className="font-semibold">
                                                                    {item.sanPhamCT.trongLuong.ten}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-[#2f19ae]">
                                                            {(item.sanPhamCT.donGia * item.soLuong).toLocaleString()}{' '}
                                                            VNĐ
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
                                                {totalPrice.toLocaleString()} VNĐ
                                            </span>
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                                Phương thức thanh toán
                                            </h3>
                                            <div className="space-y-3">
                                                <label
                                                    className={`w-full flex items-center justify-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg ${selectedPaymentMethod === 'cash' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        value="cash"
                                                        checked={selectedPaymentMethod === 'cash'}
                                                        onChange={() => setSelectedPaymentMethod('cash')}
                                                        className="hidden"
                                                    />
                                                    🚚 Thanh toán khi nhận hàng
                                                </label>
                                                <label
                                                    className={`w-full flex items-center justify-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg ${selectedPaymentMethod === 'vnpay' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        value="vnpay"
                                                        checked={selectedPaymentMethod === 'vnpay'}
                                                        onChange={() => setSelectedPaymentMethod('vnpay')}
                                                        className="hidden"
                                                    />
                                                    💳 Thanh toán qua VNPay
                                                </label>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            className="w-full bg-gradient-to-r from-[#ae1919] to-[#b52e6f] text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-[#251589] hover:to-[#3d2491] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            🛒 Đặt hàng
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
