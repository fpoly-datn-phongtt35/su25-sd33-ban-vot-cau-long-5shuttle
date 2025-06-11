import React, {  useState } from 'react';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import swal from 'sweetalert';
import { CartContext } from './CartContext';

const CartItem = ({ cart, onQuantityChange, onDeleteCart }) => {
    const [quantity, setQuantity] = useState(cart.soLuong);
    const maxQuantity = cart?.sanPhamCT?.soLuong || 0;
    const [isEditing, setIsEditing] = useState(false);







    const handleQuantityChange = (e) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) {
            const num = newValue === '' ? 1 : parseInt(newValue);
            if (num > maxQuantity) {
                swal('Thông báo', `Số lượng không được vượt quá ${maxQuantity}`, 'warning');
                setQuantity(maxQuantity);
                onQuantityChange(cart.id, maxQuantity);
            } else if (num < 1) {
                // Nếu nhập nhỏ hơn 1 thì gọi xóa
                onDeleteCart(cart.id);
            } else {
                setQuantity(num);
                onQuantityChange(cart.id, num);
            }
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        const adjusted = Math.min(Math.max(quantity, 1), maxQuantity);
        setQuantity(adjusted);
        onQuantityChange(cart.id, adjusted);
    };

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            onQuantityChange(cart.id, newQuantity);
        } else {
            swal('Thông báo', `Số lượng không được vượt quá ${maxQuantity}`, 'warning');
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(cart.id, newQuantity);
        } else {
            // Xóa sản phẩm khi giảm xuống dưới 1
            onDeleteCart(cart.id);
        }
    };

    return (
        <div className="p-5 shadow-lg border rounded-md">
            <div className="flex items-center">
                <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                    <img
                        className="w-full h-full object-cover object-top"
                        src={cart.hinhAnhUrl}
                        alt=""
                    />
                </div>
                <div className="ml-5 space-y-1">
                    <p className="font-semibold">{cart.sanPhamCT.ten}</p>
                    <p className="opacity-70">Trọng lượng: {cart.sanPhamCT.trongLuong.ten}</p>
                    <p className="opacity-70 mt-2">Thương hiệu: {cart.sanPhamCT.thuongHieu.ten}</p>
                    <div className="flex space-x-2 items-center pt-3">
                        <p className="font-semibold text-lg text-red-600">
                            {cart.sanPhamCT.donGia.toLocaleString()} ₫
                        </p>
                    </div>
                </div>
            </div>
            <div className="lg:flex items-center lg:space-x-10 pt-4">
                <div className="flex items-center space-x-2">
                    <IconButton sx={{ color: '#2f19ae' }} onClick={handleDecrease} aria-label="decrease">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    {isEditing ? (
                        <input
                            type="text"
                            value={quantity}
                            onChange={handleQuantityChange}
                            onBlur={handleBlur}
                            className="py-1 px-2 border rounded-sm w-16 text-center"
                            autoFocus
                        />
                    ) : (
                        <span
                            className="py-1 px-7 border rounded-sm cursor-pointer"
                            onClick={() => setIsEditing(true)}
                        >
                            {quantity}
                        </span>
                    )}
                    <IconButton
                        sx={{ color: quantity < maxQuantity ? '#2f19ae' : 'gray' }}
                        onClick={handleIncrease}
                        aria-label="increase"
                        disabled={quantity >= maxQuantity}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
                <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
                    <Button variant="text" sx={{ color: '#2f19ae' }} onClick={() => onDeleteCart(cart.id)}>
                        Remove
                    </Button>
                </div>
            </div>
            <div className="text-sm text-gray-500 mt-2">Còn {maxQuantity} sản phẩm trong kho</div>
        </div>
    );
};

export default CartItem;
