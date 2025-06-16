import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import ProductInfo from './ProductInfo';
import ColorWeight from './ColorWeight';
import Variants from './Variants';

// Giả định mockVariants đã được định nghĩa
const mockVariants = [
    {
        id: 1,
        name: "Vợt Yonex Astrox 100ZZ",
        quantity: 5,
        price: 3200000,
        weight: "3U",
        color: "Hồng",
    },
    {
        id: 2,
        name: "Vợt Lining Tectonic 7D",
        quantity: 3,
        price: 2950000,
        weight: "4U",
        color: "Xanh dương",
    },
    // Thêm các sản phẩm khác...
];

function AddProduct() {
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedWeights, setSelectedWeights] = useState([]);

    const filterVariants = () => {
    console.log("Selected Colors: ", selectedColors);
    console.log("Selected Weights: ", selectedWeights);
    return mockVariants.filter(variant =>
        selectedColors.includes(variant.color) && selectedWeights.includes(variant.weight)
    );
};

    const filteredVariants = filterVariants();
    console.log("bleeee hehe: ",filteredVariants);

    const handleRemoveVariant = (id) => {
        const newVariants = variants.filter(variant => variant.id !== id);
        setVariants(newVariants);
    };

    const handleChange = (id, field, value) => {
        setVariants(prev =>
            prev.map(item =>
                item.id === id ? { ...item, [field]: field === 'price' || field === 'quantity' ? Number(value) : value } : item
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Logic to submit the product and variants to the backend
        // ...
        setLoading(false);
    };

    return (
        <div>
            <div className="font-bold text-sm">
                <span className="cursor-pointer">Sản phẩm</span>
                <span className="text-gray-400 ml-2">/ Thêm sản phẩm</span>
            </div>
            <ProductInfo
                status={status}
                setStatus={setStatus}
                description={description}
                setDescription={setDescription}
            />

            <ColorWeight
                setSelectedColors={setSelectedColors}
                setSelectedWeights={setSelectedWeights}
            />
            <Variants
                filteredVariants={filteredVariants}
                handleRemoveVariant={handleRemoveVariant}
                handleChange={handleChange}
            />

            <div className="mt-6">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white rounded-md px-4 py-2 ml-auto flex items-center"
                >
                    {loading ? <CircularProgress size={24} /> : 'Lưu'}
                </button>
            </div>
        </div>
    );
}

export default AddProduct;
