import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import Swal from 'sweetalert2';
import axios from 'axios';
import ProductModal from './ProductModal';
import ProductList from './ProductList';
import PaymentSummary from './PaymentSummary';

function OfflineSale() {
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showQuantityModal, setShowQuantityModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [billDetails, setBillDetails] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteDetail, setDeleteDetail] = useState(null);

    useEffect(() => {
        fetchBills();
    }, []);

    const fetchBills = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/hoa-don');
            setBills(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách hóa đơn:', error);
        }
    };

    const fetchBillDetails = async (idHoaDon) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/hoa-don-ct/hoa-don/${idHoaDon}`);
            setBillDetails(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách hóa đơn:', error);
        }
    };

    const handleAddBill = async (values) => {
        if (bills.length >= 6) {
            swal('Thất bại!', 'Chỉ được tạo tối đa 6 hóa đơn!', 'warning');
            return;
        }
        const newBill = {
            ma: 'HD' + Date.now(),
            ten: values.billName,
            taiKhoan: { id: 1 },
            loaiHoaDon: 'Tại quầy',
            ngayTao: new Date().toISOString(),
            trangThai: values.status === '1' ? 1 : 0,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/hoa-don', newBill);
            setBills((prev) => [...prev, response.data]);
            swal('Thành công!', 'Hóa đơn đã được thêm!', 'success');
        } catch (error) {
            console.error('Lỗi khi thêm hóa đơn:', error);
            swal('Thất bại!', 'Không thể thêm hóa đơn!', 'error');
        }
    };

    

    const subtotal = billDetails.reduce((total, orderDetail) => {
        return total + orderDetail.sanPhamCT.donGia * orderDetail.soLuong; // Cộng giá bán của từng sản phẩm
    }, 0);

    console.log("tong tine: ", subtotal);

    const handleProductModal = () => {
        setShowProductModal(true);
    };

    const handleCloseProductModal = () => {
        setShowProductModal(false);
    };

    const openDeleteModal = (detail) => {
        setDeleteDetail(detail);
        setIsModalOpen(true);
    };

    const handleAddBillDetail = (billDetail) => {
        const newBillDetail = {
            sanPhamCT: { id: billDetail.idSanPhamCT },
            hoaDon: { id: billDetail.idHoaDon },
            soLuong: billDetail.soLuong,
            giaBan: billDetail.giaBan,
            trangThai: 1,
        };

        axios
            .post('http://localhost:8080/api/hoa-don-ct', newBillDetail)
            .then((response) => {
                setBillDetails((prev) => [...prev, response.data]);
                swal('Thành công!', 'Sản phẩm đã được thêm vào hóa đơn!', 'success');
            })
            .catch((error) => {
                console.error('Lỗi khi thêm chi tiết hóa đơn:', error);
                swal('Lỗi!', 'Không thể thêm sản phẩm vào hóa đơn', 'error');
            });
    };

    

    const handleBillClick = (bill) => {
        setSelectedBill(bill);
        fetchBillDetails(bill.id);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* Main Layout Container */}
            <div className="flex flex-col gap-4 h-[calc(100vh-2rem)] ">
                {/* Top Section - Bills and Products */}
                <div className="flex-1 bg-white rounded-lg shadow-sm p-6 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="font-bold text-2xl text-gray-800">Bán hàng</h1>
                        <button
                            className="bg-[#2f19ae] hover:bg-[#241587] text-white py-2 px-4 rounded-md flex items-center transition-colors"
                            onClick={() => handleAddBill({ billName: 'Hóa đơn mới', status: '1' })}
                        >
                            <AddIcon style={{ fontSize: 19 }} className="mr-2" />
                            Thêm hóa đơn
                        </button>
                    </div>

                    {/* Bills Tabs */}
                    {bills.length > 0 ? (
                        <div className="flex items-center border-b-2 border-gray-200 mb-6 overflow-x-auto">
                            {bills
                                .filter((bill) => bill.loaiHoaDon === 'Tại quầy' && bill.trangThai !== 6)
                                .map((bill) => (
                                    <div
                                        key={bill.id}
                                        className={`flex items-center mr-6 cursor-pointer whitespace-nowrap py-2 px-1 ${
                                            selectedBill?.id === bill.id
                                                ? 'border-b-2 border-blue-800 text-blue-600'
                                                : 'text-gray-700 hover:text-blue-500'
                                        }`}
                                        onClick={() => handleBillClick(bill)}
                                    >
                                        <ShoppingCartIcon style={{ fontSize: 18 }} className="mr-2" />
                                        <span className="text-sm font-medium">
                                            Hóa đơn {bill.id} - {bill.ten}
                                        </span>
                                        <span
                                            className="text-red-500 ml-2 cursor-pointer hover:text-red-700"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <CloseIcon style={{ fontSize: 16 }} />
                                        </span>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <span className="text-gray-400 text-4xl font-light">Chưa có hóa đơn nào</span>
                            <p className="text-gray-500 mt-2">Nhấn "Thêm hóa đơn" để bắt đầu</p>
                        </div>
                    )}

                    {/* Products Section */}
                    {selectedBill && (
                        <div className=" flex-1 flex flex-col overflow-hidden">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-blue-700">Sản phẩm</h2>
                                <div className="flex space-x-3">
                                    <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
                                        QUÉT QR SẢN PHẨM
                                    </button>
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                                        onClick={handleProductModal}
                                    >
                                        THÊM SẢN PHẨM
                                    </button>
                                </div>
                            </div>

                            <hr className="border-gray-300 mb-4" />

                            {/* Product List - Scrollable */}
                            <div className="flex-1 overflow-y-auto">
                                <ProductList
                                    orderDetailDatas={billDetails}
                                    handleOpenProductModal={handleProductModal}
                                    isLiked={false}
                                    setIsLiked={() => {}}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

           <PaymentSummary
                total={subtotal}
                selectedBill={selectedBill}
           />

            {/* Modals */}
            <ProductModal
                showProductModal={showProductModal}
                handleCloseProductModal={handleCloseProductModal}
                selectedBill={selectedBill}
                onAddBillDetail={handleAddBillDetail}
            />

            {/* Quantity Modal */}
            {showQuantityModal && selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
                        <h2 className="text-xl font-bold text-center mb-6">Chọn Số Lượng</h2>

                        <div className="mb-6">
                            <p className="font-semibold text-lg">{selectedProduct.sanPhamTen}</p>
                            <p className="text-gray-600 mt-1">Giá: {selectedProduct.donGia.toLocaleString()} VND</p>
                            <p className="text-gray-600">Số lượng hiện có: {selectedProduct.soLuong}</p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nhập số lượng:</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                max={selectedProduct.soLuong}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                                Thêm vào hóa đơn
                            </button>
                            <button
                                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                                onClick={() => {
                                    setShowQuantityModal(false);
                                    setSelectedProduct(null);
                                }}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OfflineSale;
