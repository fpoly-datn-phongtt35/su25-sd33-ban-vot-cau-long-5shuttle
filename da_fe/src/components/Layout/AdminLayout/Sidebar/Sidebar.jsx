import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import logo from '../../../Assets/logo.png';
import { ChevronDown, ChevronRight, Circle } from 'react-feather';

function Sidebar() {
    const location = useLocation();
    const [openSubMenus, setOpenSubMenus] = useState({});
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
        // Auto-open submenu if current page is a sub-item
        SidebarData.forEach((item, index) => {
            if (item.subItems && item.subItems.some(subItem => subItem.link === location.pathname)) {
                setOpenSubMenus(prev => ({ ...prev, [index]: true }));
            }
        });
    }, [location.pathname]);

    const toggleSubMenu = (index) => {
        setOpenSubMenus((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleItemClick = (item, index) => {
        const hasSubItems = Array.isArray(item.subItems) && item.subItems.length > 0;
        if (hasSubItems) {
            toggleSubMenu(index);
        }
    };

    return (
        <div className={`h-screen fixed top-0 left-0 transition-all duration-300 shadow-xl z-40 ${
            isCollapsed ? 'w-[80px]' : 'w-[280px]'
        } bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 overflow-hidden`}>
            
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-[#2f19ae] to-purple-600 p-6 mb-2">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-3 h-[32px]">
                        <img 
                            src={logo} 
                            alt="Brand Logo" 
                            className="h-[50px] w-[40px] transition-transform duration-300 hover:scale-110" 
                        />
                        {!isCollapsed && (
                            <span className="text-2xl font-bold text-white tracking-tight">
                                5Shuttle
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full animate-pulse delay-500"></div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute top-4 right-2 z-50 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 text-white hover:scale-110 cursor-pointer"
                aria-label={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
                type="button"
            >
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
            </button>

            {/* Navigation Menu */}
            <div className="px-3 overflow-y-auto h-[calc(100vh-120px)] custom-scrollbar">
                <ul className="list-none p-0 m-0 space-y-1">
                    {SidebarData.map((item, index) => {
                        try {
                            const isActive =
                                location.pathname === item.link ||
                                (item.subItems &&
                                    item.subItems.some((subItem) => subItem.link === location.pathname));

                            const hasSubItems = Array.isArray(item.subItems) && item.subItems.length > 0;
                            const isSubMenuOpen = openSubMenus[index];

                            return (
                                <React.Fragment key={index}>
                                    <li
                                        className={`relative group transition-all duration-300 rounded-xl overflow-hidden ${
                                            isActive
                                                ? 'bg-gradient-to-r from-[#2f19ae] to-purple-500 shadow-lg transform scale-[1.02]'
                                                : 'hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-50 hover:shadow-md'
                                        }`}
                                        onMouseEnter={() => setHoveredItem(index)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        {/* Active indicator */}
                                        {isActive && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-r-full"></div>
                                        )}

                                        <div
                                            className={`flex items-center h-12 px-4 cursor-pointer transition-all duration-300 ${
                                                isActive ? 'text-white' : 'text-gray-700 group-hover:text-[#2f19ae]'
                                            }`}
                                            onClick={() => handleItemClick(item, index)}
                                        >
                                            {hasSubItems ? (
                                                <div className="flex w-full items-center justify-between cursor-pointer">
                                                    <div className="flex items-center flex-1 cursor-pointer">
                                                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                                                            isActive 
                                                                ? 'bg-white/20 text-white' 
                                                                : 'text-gray-600 group-hover:bg-[#2f19ae]/10 group-hover:text-[#2f19ae]'
                                                        }`}>
                                                            {item.icon ?? <Circle className="w-4 h-4" />}
                                                        </div>
                                                        {!isCollapsed && (
                                                            <span className="ml-3 font-medium text-sm truncate">
                                                                {item.title}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {!isCollapsed && (
                                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                                                            isSubMenuOpen ? 'rotate-180' : 'rotate-0'
                                                        }`} />
                                                    )}
                                                </div>
                                            ) : (
                                                <Link to={item.link} className="flex items-center w-full cursor-pointer">
                                                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                                                        isActive 
                                                            ? 'bg-white/20 text-white' 
                                                            : 'text-gray-600 group-hover:bg-[#2f19ae]/10 group-hover:text-[#2f19ae]'
                                                    }`}>
                                                        {item.icon ?? <Circle className="w-4 h-4" />}
                                                    </div>
                                                    {!isCollapsed && (
                                                        <span className="ml-3 font-medium text-sm truncate">
                                                            {item.title}
                                                        </span>
                                                    )}
                                                </Link>
                                            )}
                                        </div>

                                        {/* Hover effect */}
                                        {hoveredItem === index && !isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#2f19ae]/5 to-purple-500/5 rounded-xl"></div>
                                        )}
                                        
                                        {/* Tooltip for collapsed state */}
                                        {isCollapsed && hoveredItem === index && (
                                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap">
                                                {item.title}
                                                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
                                            </div>
                                        )}
                                    </li>

                                    {/* Submenu */}
                                    {hasSubItems && !isCollapsed && (
                                        <div className={`overflow-hidden transition-all duration-300 ${
                                            isSubMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                            <ul className="list-none p-0 m-0 ml-4 space-y-1 border-l-2 border-gray-200">
                                                {item.subItems.map((subItem, subIndex) => {
                                                    const subItemActive = location.pathname === subItem.link;

                                                    return (
                                                        <li
                                                            className={`relative group transition-all duration-300 rounded-lg overflow-hidden ${
                                                                subItemActive
                                                                    ? 'bg-gradient-to-r from-[#2f19ae]/20 to-purple-500/20 shadow-md'
                                                                    : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50'
                                                            }`}
                                                            key={`${subItem.link}-${subIndex}`}
                                                        >
                                                            {subItemActive && (
                                                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2f19ae] to-purple-400"></div>
                                                            )}

                                                            <Link to={subItem.link} className="flex items-center h-10 px-4 cursor-pointer">
                                                                <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                                                                    subItemActive 
                                                                        ? 'bg-[#2f19ae] scale-125' 
                                                                        : 'bg-gray-300 group-hover:bg-[#2f19ae] group-hover:scale-110'
                                                                }`}></div>
                                                                <span className={`text-sm font-medium transition-colors duration-300 ${
                                                                    subItemActive 
                                                                        ? 'text-[#2f19ae] font-semibold' 
                                                                        : 'text-gray-600 group-hover:text-[#2f19ae]'
                                                                }`}>
                                                                    {subItem.title}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        } catch (error) {
                            console.error(`Lỗi khi render sidebar item [${item.title}]:`, error);
                            return (
                                <li key={`error-${index}`} className="text-red-500 pl-5 py-2 text-sm bg-red-50 rounded-lg mx-2 cursor-pointer">
                                    <div className="flex items-center">
                                        <Circle className="w-4 h-4 mr-2" />
                                        Lỗi: {error.message}
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>

            {/* Footer decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2f19ae] to-purple-500"></div>

            {/* Custom scrollbar styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #2f19ae, #8b5cf6);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #2f19ae, #7c3aed);
                }
            `}</style>
        </div>
    );
}

export default Sidebar;

