import swal from 'sweetalert';
import { useState, useEffect, useContext } from 'react';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import classNames from 'classnames';
import ProductCard from '../Product/ProductCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';


export default function ProductDetail() {
    const { id } = useParams(); // Lấy ID từ URL
    const [product, setProduct] = useState(null);

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [currentImages, setCurrentImages] = useState([]);
    const [mainImage, setMainImage] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(0);
    
    // State cho bình luận và đánh giá
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(1);


    const { setCartItemCount } = useContext(CartContext);


     
    const relatedProducts = [
    {
        id: 2,
        tenSanPham: "Yonex Arcsaber 1 Clear",
        hinhAnhDaiDien: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-arcsaber-1-clear-blue-chinh-hang_1715112569.webp",
        donGia: 559000,
    },
    {
        id: 3,
        tenSanPham: "Yonex Voltric Lite 40i",
        hinhAnhDaiDien: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-voltric-lite-40i-chinh-hang_1706659551.webp",
        donGia: 689000,
    },
    {
        id: 4,
        tenSanPham: "Yonex Arcsaber 0 Ability",
        hinhAnhDaiDien: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-arcsaber-0-ability_1739223521.webp",
        donGia: 559000,
    },
    {
        id: 5,
        tenSanPham: "Yonex Nanoflare 001A 2024",
        hinhAnhDaiDien: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-nanoflare-001a-2024-black-red-chinh-hang_1731869229.webp",
        donGia: 959000,
    },
];



    // Lấy dữ liệu sản phẩm từ API
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                 const response = await axios.get(`http://localhost:8080/api/san-pham-ct/${id}/detaill`);
                setProduct(response.data);
                setSelectedColor(response.data.mauSac[0]); // Chọn màu sắc đầu tiên
                setSelectedWeight(response.data.trongLuong[0]); // Chọn trọng lượng đầu tiên
                setCurrentImages(response.data.hinhAnhUrls);
                setMainImage(response.data.hinhAnhUrls[0]);
                setCurrentPrice(response.data.donGia);
                setCurrentQuantity(response.data.soLuong);
            } catch (error) {
                console.error('Failed to fetch product detail', error);
            }
        };

        fetchProductDetail();
    }, []);

    // Cập nhật hình ảnh, giá và số lượng dựa trên màu sắc và trọng lượng đã chọn
    useEffect(() => {
        if (product) {
            const selectedVariant = product.variants.find(
                (v) => v.mauSacTen === selectedColor && v.trongLuongTen === selectedWeight,
            );

            if (selectedVariant) {
                setCurrentImages(selectedVariant.hinhAnhUrls);
                setMainImage(selectedVariant.hinhAnhUrls[0]);
                setCurrentPrice(selectedVariant.donGia);
                setCurrentQuantity(selectedVariant.soLuong)
                setQuantity(1);
            }
        }
    }, [selectedColor, selectedWeight, product]);

    const handleIncrease = () => {
        const selectedVariant = product.variants.find(
            (v) => v.mauSacTen === selectedColor && v.trongLuongTen === selectedWeight,
        );
        if (selectedVariant && quantity < selectedVariant.soLuong) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    

    const handleAddCart = async () => {
    const selectedVariant = product.variants.find(
        (v) => v.mauSacTen === selectedColor && v.trongLuongTen === selectedWeight,
    );
    if (!selectedVariant) {
        swal('Thất bại!', 'Vui lòng chọn màu sắc và trọng lượng!', 'error');
        return;
    }
    if (quantity > selectedVariant.soLuong) {
        swal('Thất bại!', 'Số lượng vượt quá số lượng trong kho!', 'error');
        return;
    }

    const idTaiKhoan = 1; // ID tài khoản thực tế
    const payload = {
        idTaiKhoan: idTaiKhoan,
        idSanPhamCT: selectedVariant.id,
        soLuong: quantity,
    };
    try {
        const response = await axios.post('http://localhost:8080/api/gio-hang/them', payload);
        if (response.status === 201) {
            swal('Thành công!', 'Sản phẩm đã được thêm vào giỏ hàng!', 'success');
            // Gọi API để lấy số lượng sản phẩm trong giỏ hàng
            const countResponse = await axios.get(`http://localhost:8080/api/gio-hang/${idTaiKhoan}/count`);
            setCartItemCount(countResponse.data); // Cập nhật số lượng giỏ hàng
        } else {
            swal('Thất bại!', 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!', 'error');
        }
    } catch (error) {
        console.error('Failed to add product to cart', error);
        swal('Thất bại!', 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!', 'error');
    }
};



    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    // Hàm để thêm bình luận
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return; // Không cho phép bình luận trống
        const commentData = {
            text: newComment,
            rating: newRating,
        };
        setComments([...comments, commentData]);
        setNewComment('');
        setNewRating(1); // Reset đánh giá về 1 sao
    };

    if (!product) {
        return <div>Loading...</div>; // Hiển thị loading khi dữ liệu chưa được tải
    }

    return (
        <div className="bg-white">
            <div className="pt-6">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
                    {/* Image gallery */}
                    <div className="flex flex-col items-center h-[510px]">
                        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                            <img
                                alt={mainImage}
                                src={mainImage}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-wrap space-x-5 justify-center">
                            {currentImages.map((link, index) => (
                                <div
                                    key={index}
                                    className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[10rem] mt-4"
                                    onClick={() => handleThumbnailClick(link)}
                                >
                                    <img
                                        alt={`Image ${index}`}
                                        src={link}
                                        className="h-full w-full object-cover object-center cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
                        <div className="lg:col-span-2">
                            <h1 className="text-[25px] lg:text-[29px] font-semibold text-gray-900">
                                {product.tenSanPham}
                            </h1>
                            <div className="flex justify-between text-sm">
                                <p>
                                    Thương hiệu: <span className="text-[#2f19ae]">{product.thuongHieu}</span>
                                </p>
                                <p>
                                    Tình trạng: 
                                    <span className="text-[#2f19ae]">
                                        {product.soLuong > 0 ? ' Còn hàng' : ' Hết hàng'}
                                    </span>
                                </p>
                                <p>
                                    Số lượng trong kho: 
                                    <span className="text-[#2f19ae]">
                                        {/* {product.variants.find(
                                            (v) => v.mauSacTen === selectedColor && v.trongLuongTen === selectedWeight,
                                        )?.soLuong || 0} */}
                                    {currentQuantity} 
                                        
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                                <p className="font-semibold text-red-600">
                                    {currentPrice.toLocaleString()} ₫
                                </p>
                            </div>

                            <form className="mt-10">
                                {/* Colors    đang bị lỗi trùng màu sắc (cần được thử nghiệm) */}
                                {/* <div>
                                    <h3 className="text-sm font-medium text-gray-900">Màu sắc</h3>
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        {product.variants.map((variant) => (
                                            <div
                                                key={variant.id}
                                                className={classNames(
                                                    'flex items-center p-2 border rounded-lg cursor-pointer',
                                                    selectedColor === variant.mauSacTen ? 'border-indigo-500' : 'border-gray-300'
                                                )}
                                                onClick={() => {
                                                    setSelectedColor(variant.mauSacTen);
                                                    setCurrentImages(variant.hinhAnhUrls);
                                                    setMainImage(variant.hinhAnhUrls[0]);
                                                    setCurrentPrice(variant.donGia);
                                                    setCurrentQuantity(variant.soLuong);
                                                }}
                                            >
                                                <img
                                                    src={variant.hinhAnhUrls[0]} // Hiển thị hình ảnh đầu tiên của biến thể
                                                    alt={variant.mauSacTen}
                                                    className="h-16 w-16 object-cover mr-2"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm">{variant.mauSacTen}</span>
                                                    <span className="text-sm font-semibold text-red-600">
                                                        {variant.donGia.toLocaleString()} ₫
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}

                                {/* Phần filter màu sắc dùng product.mauSac */}
{/* Phần form chọn màu sắc hiện tại trong form bán hàng */}
<div>
    <h3 className="text-sm font-medium text-gray-900">Màu sắc</h3>
    <div className="grid grid-cols-2 gap-2 mt-4">
        {product.mauSac.map((color) => (
            <div
                key={color}
                className={classNames(
                    "flex items-center p-2 border rounded-lg cursor-pointer",
                    selectedColor === color ? "border-indigo-500" : "border-gray-300"
                )}
                onClick={() => {
                    setSelectedColor(color);
                    // Tìm variant đầu tiên có màu này và trọng lượng đang chọn để cập nhật hình ảnh, giá
                    const foundVariant = product.variants.find(
                        (v) => v.mauSacTen === color && v.trongLuongTen === selectedWeight
                    ) || product.variants.find(v => v.mauSacTen === color);
                    if(foundVariant) {
                        setCurrentImages(foundVariant.hinhAnhUrls);
                        setMainImage(foundVariant.hinhAnhUrls[0]);
                        setCurrentPrice(foundVariant.donGia);
                        setCurrentQuantity(foundVariant.soLuong);
                        setQuantity(1);
                    }
                }}
            >
                <img
                    src={product.variants.find(v => v.mauSacTen === color)?.hinhAnhUrls[0] || ""}
                    alt={color}
                    className="h-16 w-16 object-cover mr-2"
                />
                <div className="flex flex-col">
                    <span className="text-sm">{color}</span>
                    <span className="text-sm font-semibold text-red-600">
                        {product.variants.find(v => v.mauSacTen === color)?.donGia.toLocaleString() || ""}
                        {' '}₫
                    </span>
                </div>
            </div>
        ))}
    </div>
</div>





                                {/* Weights */}
<div className="mt-10">
    <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Trọng lượng</h3>
    </div>

    <fieldset aria-label="Chọn trọng lượng" className="mt-4">
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
            {product.trongLuong.map((weight) => {
                const variant = product.variants.find(
                    (v) => v.mauSacTen === selectedColor && v.trongLuongTen === weight,
                );
                const inStock = variant && variant.soLuong > 0;

                return (
                    <div
                        key={weight}
                        className={classNames(
                            'flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none',
                            selectedWeight === weight ? 'border-indigo-500' : 'border-gray-300',
                            inStock ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200'
                        )}
                        onClick={() => {
                            if (inStock) {
                                setSelectedWeight(weight);
                            }
                        }}
                    >
                        <span>{weight}</span>
                    </div>
                );
            })}
        </div>
    </fieldset>
</div>


                                <div className="flex items-center space-x-2 mt-5">
                                    <IconButton sx={{ color: '#2f19ae' }} aria-label="remove" onClick={handleDecrease}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                    <input
                                        className="py-1 px-1 border rounded-sm w-16"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                        min="1"
                                        type="number"
                                    />
                                    <IconButton sx={{ color: '#2f19ae' }} aria-label="add" onClick={handleIncrease}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </div>

                                <button
                                    type="button"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={handleAddCart}
                                >
                                    THÊM VÀO GIỎ HÀNG
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Phần bình luận và đánh giá */}
                <div className="mt-10 px-4">
                    <h2 className="text-lg font-semibold">Bình luận và đánh giá</h2>
                    <form onSubmit={handleCommentSubmit} className="mt-4">
                        <textarea
                            className="w-full border rounded-md p-2"
                            rows="4"
                            placeholder="Nhập bình luận của bạn..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="flex items-center mt-2">
                            <span className="mr-2">Đánh giá:</span>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={classNames(
                                        'cursor-pointer',
                                        newRating >= star ? 'text-yellow-500' : 'text-gray-300'
                                    )}
                                    onClick={() => setNewRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
                        >
                            Gửi bình luận
                        </button>
                    </form>

                    {/* Hiển thị danh sách bình luận */}
                    <div className="mt-6">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="border-b py-2">
                                    <div className="flex items-center">
                                        <span className="text-yellow-500">
                                            {Array.from({ length: comment.rating }, (_, i) => (
                                                <span key={i}>★</span>
                                            ))}
                                            {Array.from({ length: 5 - comment.rating }, (_, i) => (
                                                <span key={i} className="text-gray-300">★</span>
                                            ))}
                                        </span>
                                    </div>
                                    <p className="mt-1">{comment.text}</p>
                                </div>
                            ))
                        ) : (
                            <p>Chưa có bình luận nào.</p>
                        )}
                    </div>
                </div>

                {/* Sản phẩm liên quan */}
<div className="mt-10 px-4">
    <h2 className="text-lg font-semibold">Sản phẩm liên quan</h2>
    <div className="flex flex-wrap">
        {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
        ))}
    </div>
</div>

            </div>
        </div>
    );
}
