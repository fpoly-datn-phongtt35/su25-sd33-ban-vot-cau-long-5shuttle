import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const handleProductClick = () => {
        navigate(`/san-pham/san-pham-ct/${product.id}`); // Điều hướng đến trang ProductDetail với ID sản phẩm
    };

    // Kiểm tra xem hinhAnhUrls có tồn tại và có ít nhất một hình ảnh không
    const mainImage = product.hinhAnhUrls && product.hinhAnhUrls.length > 0
        ? product.hinhAnhUrls.find((url) => url.includes('main')) || product.hinhAnhUrls[0]
        : 'default-image-url.jpg'; // Thay thế bằng URL hình ảnh mặc định nếu cần

    // Sử dụng đúng thuộc tính price
    const price = product.price ? product.price.toLocaleString() : 'Không xác định giá'; // Giá mặc định nếu không có

    return (
        <div className="flex flex-wrap">
            <div className="productCard w-[195px] m-3 transition-all cursor-pointer">
                <div className="h-[15rem]" onClick={handleProductClick}>
                    <img className="w-full h-full object-cover" src={mainImage} alt={product.sanPhamTen} />
                </div>

                <div className="textPart bg-white p-3">
                    <div>
                        {/* Chỉnh kích thước font của tên sản phẩm */}
                        <p className="font-bold opacity-60" style={{ fontSize: '13px' }}>
                            {product.sanPhamTen}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* Chỉnh kích thước font của giá sản phẩm */}
                        <p className="font-bold text-red-500 text-sm">{price} ₫</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
