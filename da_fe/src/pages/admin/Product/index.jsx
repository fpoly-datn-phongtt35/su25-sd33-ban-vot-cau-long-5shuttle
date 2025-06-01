import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import AddIcon from '@mui/icons-material/Add';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

function SanPham() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToUpdate, setProductToUpdate] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const loadProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/san-pham');
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Delete a product
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/san-pham/${id}`);
            loadProducts();
            setShowModal(false);
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    // Add a new product
    const handleAddProduct = async (values) => {
        const newProduct = {
            ma: values.productCode,
            ten: values.productName,
            donGia: values.price,
            soLuong: values.quantity,
            trangThai: values.status === '1' ? 1 : 0,
        };
        try {
            await axios.post('http://localhost:8080/api/san-pham', newProduct);
            swal('Thành công!', 'Sản phẩm đã được thêm!', 'success');
            setShowAddModal(false);
            loadProducts();
            reset(); // Reset form values after adding
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm sản phẩm!', error);
            swal('Thất bại!', 'Có lỗi xảy ra khi thêm sản phẩm!', 'error');
        }
    };

    // Open modal to confirm deletion
    const confirmDelete = (id) => {
        setProductToDelete(id);
        setShowModal(true);
    };

    const handleAddModal = () => {
        reset(); // Reset the form values and errors
        setShowAddModal(true);
    };

    // Open update modal and fill the form
    const handleUpdateModal = async (product) => {
        reset();
        setValue('productCode', product.ma);
        setValue('productName', product.ten);
        setValue('price', product.donGia);
        setValue('quantity', product.soLuong);
        setValue('status', product.trangThai.toString());
        setProductToUpdate(product.id);
        setShowUpdateModal(true);
    };

    // Update a product
    const handleUpdateProduct = async (values) => {
        const updatedProduct = {
            ma: values.productCode,
            ten: values.productName,
            donGia: values.price,
            soLuong: values.quantity,
            trangThai: values.status === '1' ? 1 : 0,
        };
        try {
            await axios.put(`http://localhost:8080/api/san-pham/${productToUpdate}`, updatedProduct);
            swal('Thành công!', 'Sản phẩm đã được cập nhật!', 'success');
            setShowUpdateModal(false);
            loadProducts();
            reset(); // Reset form values after updating
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật sản phẩm!', error);
            swal('Thất bại!', 'Có lỗi xảy ra khi cập nhật sản phẩm!', 'error');
        }
    };

    // Get current products based on pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate total pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Pagination controls
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-2 max-w-7xl mx-auto bg-white rounded-lg">
            <h4 className="text-center text-5xl font-bold text-gray-800">Danh sách sản phẩm</h4>
            <div>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleAddModal}
                        className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium py-2 px-4 rounded"
                    >
                        <AddIcon />
                    </button>
                </div>
                <table className="w-full table-auto bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-4 px-6 text-left">STT</th>
                            <th className="py-4 px-6 text-left">ID</th>
                            <th className="py-4 px-6 text-left">Mã sản phẩm</th>
                            <th className="py-4 px-6 text-left">Tên sản phẩm</th>
                            <th className="py-4 px-6 text-left">Trạng thái</th>
                            <th className="py-4 px-6 text-left">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product, index) => (
                            <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-100">
                                <td className="py-4 px-6">{indexOfFirstProduct + index + 1}</td>
                                <td className="py-4 px-6">{product.id}</td>
                                <td className="py-4 px-6">{product.ma}</td>
                                <td className="py-4 px-6">{product.ten}</td>
                                <td className="py-4 px-6">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${product.trangThai ? 'text-green-600 bg-green-100 border border-green-600' : 'text-red-600 bg-red-100 border border-red-600'}`}
                                    >
                                        {product.trangThai ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex">
                                        <button
                                            onClick={() => handleUpdateModal(product)}
                                            className=" hover:bg-gray-400 font-medium py-2 px-4 rounded"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => confirmDelete(product.id)}
                                            className="hover:bg-gray-400 font-medium py-2 px-4 rounded"
                                        >
                                            <TrashIcon className="w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal for delete confirmation */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-bold mb-4">Xác nhận xóa</h3>
                            <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => handleDelete(productToDelete)}
                                    className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal for adding a product */}
                {showAddModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-bold mb-4">Thêm sản phẩm</h3>
                            <form onSubmit={handleSubmit(handleAddProduct)}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Mã sản phẩm</label>
                                    <input
                                        type="text"
                                        className={`border border-gray-300 p-2 w-full rounded-lg ${errors.productCode ? 'border-red-500' : ''}`}
                                        {...register('productCode', { required: true })}
                                    />
                                    {errors.productCode && <span className="text-red-500">Mã sản phẩm là bắt buộc.</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Tên sản phẩm</label>
                                    <input
                                        type="text"
                                        className={`border border-gray-300 p-2 w-full rounded-lg ${errors.productName ? 'border-red-500' : ''}`}
                                        {...register('productName', { required: true })}
                                    />
                                    {errors.productName && <span className="text-red-500">Tên sản phẩm là bắt buộc.</span>}
                                </div>
                                
                               
                                <div className="mb-4">
                                    <label className="block text-gray-700">Trạng thái</label>
                                    <select
                                        className="border border-gray-300 p-2 w-full rounded-lg"
                                        {...register('status', { required: true })}
                                    >
                                        <option value="1">Kích hoạt</option>
                                        <option value="0">Tạm ngừng</option>
                                    </select>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                                    >
                                        Thêm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Modal for updating a product */}
                {showUpdateModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-bold mb-4">Cập nhật sản phẩm</h3>
                            <form onSubmit={handleSubmit(handleUpdateProduct)}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Mã sản phẩm</label>
                                    <input
                                        type="text"
                                        className={`border border-gray-300 p-2 w-full rounded-lg ${errors.productCode ? 'border-red-500' : ''}`}
                                        {...register('productCode', { required: true })}
                                    />
                                    {errors.productCode && <span className="text-red-500">Mã sản phẩm là bắt buộc.</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Tên sản phẩm</label>
                                    <input
                                        type="text"
                                        className={`border border-gray-300 p-2 w-full rounded-lg ${errors.productName ? 'border-red-500' : ''}`}
                                        {...register('productName', { required: true })}
                                    />
                                    {errors.productName && <span className="text-red-500">Tên sản phẩm là bắt buộc.</span>}
                                </div>
                                
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700">Trạng thái</label>
                                    <select
                                        className="border border-gray-300 p-2 w-full rounded-lg"
                                        {...register('status', { required: true })}
                                    >
                                        <option value="1">Kích hoạt</option>
                                        <option value="0">Tạm ngừng</option>
                                    </select>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        onClick={() => setShowUpdateModal(false)}
                                        className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                                    >
                                        Cập nhật
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="text-gray-600"
                    >
                        <SkipPreviousIcon />
                    </button>
                    <span className="text-gray-600">{`Page ${currentPage} of ${totalPages}`}</span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="text-gray-600"
                    >
                        <SkipNextIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SanPham;
