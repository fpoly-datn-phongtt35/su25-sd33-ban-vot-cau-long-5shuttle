// OrderProgress.js
import React from 'react';

const OrderProgress = ({
    currentOrderStatus,
    setCurrentOrderStatus,
    timeline,
    getStatusInfo,
    progressPercentage,
    shouldShowActionButton,
    handleActionButtonClick,
    getActionButtonStyle,
    getActionButtonText,
}) => {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Lịch sử đơn hàng
                    </h2>

                    {/* Status Selector for Demo */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Trạng thái:</span>
                            <select
                                value={currentOrderStatus}
                                onChange={(e) => setCurrentOrderStatus(parseInt(e.target.value))}
                                className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((status) => (
                                    <option key={status} value={status}>
                                        {getStatusInfo(status).label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Ẩn checkbox "Đã thanh toán" vì logic mới không cần */}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-12">
                    <div className="flex items-center justify-between">
                        {timeline.map((step, index) => {
                            const statusInfo = getStatusInfo(step.status);
                            const IconComponent = statusInfo.icon;

                            return (
                                <div key={step.status} className="flex flex-col items-center relative z-10 flex-1">
                                    {/* Icon with animated glow */}
                                    <div
                                        className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-all duration-500 ${
                                            step.current ? 'scale-110 animate-pulse' : 'scale-100'
                                        }`}
                                        style={{
                                            backgroundColor: statusInfo.color,
                                            boxShadow: step.current
                                                ? `0 0 20px ${statusInfo.color}40`
                                                : `0 4px 15px ${statusInfo.color}20`,
                                        }}
                                    >
                                        <IconComponent className="w-10 h-10 text-white" />
                                    </div>

                                    {/* Step Info */}
                                    <div className="text-center max-w-32">
                                        <div
                                            className={`font-semibold mb-2 ${step.current ? 'text-gray-900' : 'text-gray-700'}`}
                                        >
                                            {statusInfo.label}
                                        </div>
                                        <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {step.time}
                                        </div>
                                    </div>

                                    {/* Connector Line */}
                                    {index < timeline.length - 1 && (
                                        <div
                                            className="absolute top-10 left-full w-full h-1 -translate-x-1/2 transition-all duration-700"
                                            style={{
                                                background: step.completed
                                                    ? `linear-gradient(to right, ${statusInfo.color}, ${getStatusInfo(timeline[index + 1].status).color})`
                                                    : '#e5e7eb',
                                                zIndex: -1,
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Tiến độ đơn hàng</span>
                        <span className="text-sm font-medium text-gray-700">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    {/* Nút hành động chính: Ẩn hoàn toàn khi ở trạng thái 4 và showPaymentButton=true */}
                    {shouldShowActionButton(currentOrderStatus) ? (
                        <button
                            className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium ${getActionButtonStyle(currentOrderStatus)}`}
                            disabled={currentOrderStatus === 6}
                            onClick={handleActionButtonClick}
                        >
                            {getActionButtonText(currentOrderStatus)}
                        </button>
                    ) : (
                        <div className="px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-medium cursor-default">
                            {getActionButtonText(currentOrderStatus)}
                        </div>
                    )}

                    <div className="flex items-center space-x-4">
                        {(currentOrderStatus === 1 || currentOrderStatus === 2 || currentOrderStatus === 3) && (
                            <button className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium">
                                Hủy đơn
                            </button>
                        )}

                        <button className="text-purple-600 hover:text-purple-800 transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-purple-50">
                            Chi tiết →
                        </button>
                    </div>
                </div>

                {/* Current Status Badge */}
                <div className="mt-6 text-center">
                    <div
                        className="inline-flex items-center px-6 py-3 rounded-full text-white font-semibold shadow-lg"
                        style={{ backgroundColor: getStatusInfo(currentOrderStatus).color }}
                    >
                        <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse" />
                        Trạng thái hiện tại: {getStatusInfo(currentOrderStatus).label}
                    </div>
                </div>
            </div>
    );
};

export default OrderProgress;
