import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/san-pham/san-pham-ct/${product.id}`);
    };

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
                        <span className="text-xl font-bold text-red-600">{product.donGia.toLocaleString()} ₫</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
