import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/san-pham/san-pham-ct/${product.id}`);
    };

    return (
        <div className="flex flex-wrap">
            <div className="productCard w-[195px] m-3 transition-all cursor-pointer" onClick={handleClick}>
                <div className="h-[15rem]">
                    <img
                        className="w-full h-full object-cover"
                        src={product.hinhAnhDaiDien} // Sử dụng hinhAnhDaiDien
                        alt={product.tenSanPham} // Sử dụng tenSanPham
                    />
                </div>

                <div className="textPart bg-white p-3">
                    <div>
                        <p className="font-bold opacity-60">{product.tenSanPham}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="font-bold text-red-500">{product.donGia.toLocaleString()} ₫</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
