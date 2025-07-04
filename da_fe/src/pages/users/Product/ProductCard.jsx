import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/san-pham/san-pham-ct/${product.id}`);
    };

    // Tính toán giá mới và phần trăm giảm giá
    const newPrice = product.khuyenMai; // Giá mới sau khuyến mãi
    const originalPrice = product.donGia; // Giá gốc
    const discountPercentage = product.giaTriKhuyenMai; // Phần trăm giảm giá

    return (
        <div className="flex justify-center p-4 hover:scale-105 transition-transform">
            <div
                className="productCard w-[195px] m-3 rounded-lg shadow-lg border border-gray-200 transition-shadow hover:shadow-xl cursor-pointer"
                onClick={handleClick}
            >
                <div className="h-[15rem] overflow-hidden rounded-t-lg">
                    <img
                        className="w-full h-full object-cover hover:transform hover:scale-105 transition-transform duration-300"
                        src={product.hinhAnhDaiDien}
                        alt={product.tenSanPham}
                    />
                </div>

                <div className="textPart bg-white p-4 rounded-b-lg">
                    <h3 className="text-lg font-semibold text-gray-700 line-clamp-2">{product.tenSanPham}</h3>
                    <div className="mt-2 flex items-center justify-between">
                        {newPrice && (
                            <span className="text-xl font-bold text-red-600">{newPrice.toLocaleString()} ₫</span>
                        )}
                        {originalPrice > newPrice && (
                            <span className="text-[10px] text-gray-500 line-through">{originalPrice.toLocaleString()} ₫</span>
                        )}
                    </div>
                    {discountPercentage && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{discountPercentage}%
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
