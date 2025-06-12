import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { CircularProgress } from '@mui/material';

function AddProduct() {
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [material, setMaterial] = useState('');
    const [balancePoint, setBalancePoint] = useState('');
    const [hardness, setHardness] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div>
            <div className="font-bold text-sm">
                <span className="cursor-pointer">Sản phẩm</span>
                <span className="text-gray-400 ml-2">/ Thêm sản phẩm</span>
            </div>
            <div className="bg-white p-4 rounded-md shadow-lg">
                <h2 className="text-xl text-center text-gray-500 font-bold mb-4">Thông tin sản phẩm</h2>
                <form>
                    <div className="mb-2 flex justify-center">
                        <div className="w-[85%]">
                            <label className="block text-sm font-bold text-gray-700" htmlFor="productName">
                                <span className="text-red-600">*</span>Tên sản phẩm
                            </label>
                            <input
                                type="text"
                                id="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="mt-1 block h-10 w-full border border-gray-300 rounded-md p-1 text-sm"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-2 gap-4 w-[85%] mx-auto">
                        <div className="flex items-center">
                            <div className="flex-grow">
                                <label className="block text-sm font-bold text-gray-700" htmlFor="brand">
                                    <span className="text-red-600">*</span>Thương hiệu
                                </label>
                                <select
                                    id="brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="mt-1 block w-[90%] h-10 border border-gray-300 rounded-md p-2 text-sm"
                                >
                                    <option value="">Chọn thương hiệu</option>
                                    {/* Add brand options here */}
                                </select>
                                <button
                                    onClick={() => {}}
                                    type="button"
                                    className="bg-blue-500 border border-blue-500 text-white hover:bg-white hover:text-blue-500 font-medium py-1 px-2 w-9 h-9 rounded flex items-center justify-center ml-4"
                                >
                                    <AddIcon />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex-grow">
                                <label className="block text-sm font-bold text-gray-700" htmlFor="material">
                                    <span className="text-red-600">*</span>Chất liệu
                                </label>
                                <select
                                    id="material"
                                    value={material}
                                    onChange={(e) => setMaterial(e.target.value)}
                                    className="mt-1 block w-[90%] h-10 border border-gray-300 rounded-md p-2 text-sm"
                                >
                                    <option value="">Chọn chất liệu</option>
                                    {/* Add material options here */}
                                </select>
                                <button
                                    onClick={() => {}}
                                    type="button"
                                    className="bg-blue-500 border border-blue-500 text-white hover:bg-white hover:text-blue-500 font-medium py-1 px-2 w-9 h-9 rounded flex items-center justify-center ml-4"
                                >
                                    <AddIcon />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex-grow">
                                <label className="block text-sm font-bold text-gray-700" htmlFor="balancePoint">
                                    <span className="text-red-600">*</span>Điểm cân bằng
                                </label>
                                <select
                                    id="balancePoint"
                                    value={balancePoint}
                                    onChange={(e) => setBalancePoint(e.target.value)}
                                    className="mt-1 block w-[90%] h-10 border border-gray-300 rounded-md p-2 text-sm"
                                >
                                    <option value="">Chọn điểm cân bằng</option>
                                    {/* Add balance options here */}
                                </select>
                                <button
                                    onClick={() => {}}
                                    type="button"
                                    className="bg-blue-500 border border-blue-500 text-white hover:bg-white hover:text-blue-500 font-medium py-1 px-2 w-9 h-9 rounded flex items-center justify-center ml-4"
                                >
                                    <AddIcon />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex-grow">
                                <label className="block text-sm font-bold text-gray-700" htmlFor="hardness">
                                    <span className="text-red-600">*</span>Độ cứng
                                </label>
                                <select
                                    id="hardness"
                                    value={hardness}
                                    onChange={(e) => setHardness(e.target.value)}
                                    className="mt-1 block w-[90%] h-10 border border-gray-300 rounded-md p-2 text-sm"
                                >
                                    <option value="">Chọn độ cứng</option>
                                    {/* Add stiffness options here */}
                                </select>
                                <button
                                    onClick={() => {}}
                                    type="button"
                                    className="bg-blue-500 border border-blue-500 text-white hover:bg-white hover:text-blue-500 font-medium py-1 px-2 w-9 h-9 rounded flex items-center justify-center ml-4"
                                >
                                    <AddIcon />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-2 w-[85%] mx-auto">
                        <label className="block text-sm font-bold text-gray-700" htmlFor="status">
                            <span className="text-red-600">*</span>Trạng thái
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 block w-full h-10 border border-gray-300 rounded-md p-2 text-sm"
                        >
                            <option value="">Chọn trạng thái</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                    <div className="mb-2 w-[85%] mx-auto">
                        <label className="block text-sm font-bold text-gray-700" htmlFor="description">
                            <span className="text-red-600">*</span>Mô tả
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-1 text-sm h-20"
                            required
                        />
                    </div>
                </form>
            </div>

            <div className="bg-white p-4 rounded-md shadow-lg mt-4">
                <h2 className="text-xl text-center text-gray-500 font-bold mb-4">Màu sắc & Trọng lượng</h2>
                <div className="pl-24">
                    <div className="flex items-center">
                        <label className="block text-sm font-bold text-gray-700 w-28" htmlFor="description">
                            <span className="text-red-600">*</span>Màu sắc:
                        </label>
                        <div className="flex items-center flex-wrap">
                            <button
                                className="border font-medium py-1 px-1 rounded w-9 h-6 flex items-center justify-center ml-2"
                                style={{
                                    backgroundColor: 'red',
                                    color: '#fff',
                                    borderColor: 'white',
                                }}
                                disabled
                            ></button>
                        </div>
                        <button
                            onClick={() => {}}
                            type="button"
                            className="bg-blue-500 border border-blue-500 text-white hover:bg-white hover:text-blue-500 font-medium py-1 px-2 w-9 h-6 rounded flex items-center justify-center ml-6"
                        >
                            <AddIcon />
                        </button>
                    </div>
                </div>

                <div className="pl-24 mt-6 mb-6">
                    <div className="flex items-center">
                        <label className="block text-sm font-bold text-gray-700 w-28" htmlFor="description">
                            <span className="text-red-600">*</span>Trọng lượng:
                        </label>
                        <div className="flex items-center flex-wrap">
                            <button
                                className="border font-medium text-xs py-1 px-1 rounded w-9 h-6 flex items-center justify-center ml-2"
                                style={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    borderColor: 'black',
                                }}
                                disabled
                            >
                                3U
                            </button>
                        </div>
                        <button
                            onClick={() => {}}
                            type="button"
                            className="bg-blue-500 border border-blue-500 text-white hover:bg-white hover:text-blue-500 font-medium py-1 px-2 w-9 h-6 rounded flex items-center justify-center ml-6"
                        >
                            <AddIcon />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <button
                    type="button"
                    onClick={() => {}}
                    className="bg-blue-600 text-white rounded-md px-4 py-2 ml-auto flex items-center"
                >
                    Lưu
                </button>
            </div>
        </div>
    );
}

export default AddProduct;
