import React, { useState } from 'react';
import { X, Receipt, Search, Filter, Plus, Tag } from 'lucide-react';

const ProductModal = ({ showProductModal, handleCloseProductModal }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [colorFilter, setColorFilter] = useState('');
    const [weightFilter, setWeightFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');

    // Dữ liệu sản phẩm cứng
    const products = [
        {
            id: 1,
            sanPhamTen: 'Cây vợt Yonex',
            trongLuongTen: '3U',
            donGia: 2000000,
            soLuong: 10,
            hinhAnhUrls: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop'],
        },
        {
            id: 2,
            sanPhamTen: 'Giày Lining',
            trongLuongTen: '2U',
            donGia: 1500000,
            soLuong: 5,
            hinhAnhUrls: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'],
        },
        {
            id: 3,
            sanPhamTen: 'Vợt Victor',
            trongLuongTen: '4U',
            donGia: 1800000,
            soLuong: 8,
            hinhAnhUrls: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
        },
        {
            id: 4,
            sanPhamTen: 'Giày Mizuno',
            trongLuongTen: '3U',
            donGia: 2200000,
            soLuong: 3,
            hinhAnhUrls: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop'],
        },
    ];

    const productPromotions = {
        1: { khuyenMai: { giaTri: 10 } },
        2: { khuyenMai: { giaTri: 0 } },
        3: { khuyenMai: { giaTri: 15 } },
        4: { khuyenMai: { giaTri: 5 } },
    };

    // Lọc sản phẩm
    const filteredProducts = products.filter(product => {
        const matchesSearch = searchTerm === '' || 
            product.sanPhamTen.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = brandFilter === '' || 
            product.sanPhamTen.toLowerCase().includes(brandFilter.toLowerCase());
        const matchesColor = colorFilter === '' || 
            product.sanPhamTen.toLowerCase().includes(colorFilter.toLowerCase());
        const matchesWeight = weightFilter === '' || 
            product.trongLuongTen === weightFilter;
        const matchesPrice = priceFilter === '' || 
            product.donGia <= priceFilter;

        return matchesSearch && matchesBrand && matchesColor && matchesWeight && matchesPrice;
    });

    if (!showProductModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"
                onClick={handleCloseProductModal}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-7xl  max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6 h-[80px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <Receipt className="w-7 h-7" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Thông tin sản phẩm</h2>
                            </div>
                        </div>
                        <button
                            onClick={handleCloseProductModal}
                            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:rotate-90"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(115vh-120px)]">
                    {/* Search and Filters */}
                    <div className="mb-8 space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 text-gray-700"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Filter className="w-5 h-5" />
                                <span className="font-medium">Bộ lọc:</span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <select
                                value={brandFilter}
                                onChange={(e) => setBrandFilter(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white"
                            >
                                <option value="">Tất cả thương hiệu</option>
                                <option value="Yonex">Yonex</option>
                                <option value="Lining">Lining</option>
                                <option value="Victor">Victor</option>
                                <option value="Mizuno">Mizuno</option>
                                <option value="Adidas">Adidas</option>
                            </select>

                            <select
                                value={colorFilter}
                                onChange={(e) => setColorFilter(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white"
                            >
                                <option value="">Tất cả màu sắc</option>
                                <option value="Đỏ">Đỏ</option>
                                <option value="Xanh">Xanh</option>
                                <option value="Trắng">Trắng</option>
                            </select>

                            <select
                                value={weightFilter}
                                onChange={(e) => setWeightFilter(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white"
                            >
                                <option value="">Tất cả trọng lượng</option>
                                <option value="2U">2U</option>
                                <option value="3U">3U</option>
                                <option value="4U">4U</option>
                                <option value="5U">5U</option>
                                <option value="6U">6U</option>
                            </select>

                            <select
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white"
                            >
                                <option value="">Tất cả giá</option>
                                <option value="1000000">Dưới 1 triệu</option>
                                <option value="3000000">Dưới 3 triệu</option>
                                <option value="5000000">Dưới 5 triệu</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => {
                            const promotion = productPromotions[product.id];
                            const hasPromotion = promotion && promotion.khuyenMai.giaTri > 0;
                            const discountedPrice = hasPromotion 
                                ? product.donGia * (1 - promotion.khuyenMai.giaTri / 100)
                                : product.donGia;

                            return (
                                <div key={product.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
                                    {/* Product Image */}
                                    <div className="relative overflow-hidden">
                                        {hasPromotion && (
                                            <div className="absolute top-3 left-3 z-10">
                                                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
                                                    <Tag className="w-3 h-3" />
                                                    <span>−{promotion.khuyenMai.giaTri}%</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="absolute top-3 right-3 z-10">
                                            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-200 group-hover:scale-110">
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <img
                                            src={product.hinhAnhUrls[0]}
                                            alt={product.sanPhamTen}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5">
                                        <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                            {product.sanPhamTen}
                                        </h3>
                                        
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                                {product.trongLuongTen}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                product.soLuong > 5 
                                                    ? 'bg-green-100 text-green-700'
                                                    : product.soLuong > 0
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-red-100 text-red-700'
                                            }`}>
                                                SL: {product.soLuong}
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="space-y-1">
                                            {hasPromotion ? (
                                                <div className="flex flex-col space-y-1">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-2xl font-bold text-red-500">
                                                            {discountedPrice.toLocaleString()}₫
                                                        </span>
                                                    </div>
                                                    <span className="text-gray-400 line-through text-sm">
                                                        {product.donGia.toLocaleString()}₫
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-2xl font-bold text-gray-700">
                                                    {product.donGia.toLocaleString()}₫
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* No products found */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy sản phẩm</h3>
                            <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductModal;