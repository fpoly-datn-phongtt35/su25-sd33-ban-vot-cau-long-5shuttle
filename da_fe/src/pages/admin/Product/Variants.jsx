import React from 'react';
import { Trash2, Eye } from 'lucide-react';

const Variants = ({ filteredVariants, handleRemoveVariant, handleChange }) => {
    const uniqueColors = [...new Set(filteredVariants.map(v => v.color))];

    return (
        <div className="w-full bg-white rounded-lg shadow-sm">
            {uniqueColors.map(color => (
                <div key={color}>
                    <div className="bg-gray-200 px-4 py-3 rounded-t-lg">
                        <h2 className="text-center text-gray-700 font-medium">Các sản phẩm màu {color}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-12">#</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-14">Sản phẩm</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 w-10">Số lượng</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 w-10">Đơn giá</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 w-26">Ảnh</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 w-16"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVariants.filter(v => v.color === color).map((product, index) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">{product.name}</td>
                                        <td className="px-4 py-3 text-center">
                                            <input
                                                type="number"
                                                value={product.quantity}
                                                onChange={(e) => handleChange(product.id, 'quantity', e.target.value)}
                                                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                min={0}
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <input
                                                type="number"
                                                value={product.price}
                                                onChange={(e) => handleChange(product.id, 'price', e.target.value)}
                                                className="w-24 px-2 py-1 text-sm border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                min={0}
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button className="p-1 text-gray-400 hover:text-blue-500">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleRemoveVariant(product.id)}
                                                className="p-1 text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Variants;
