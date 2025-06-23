import AddIcon from '@mui/icons-material/Add';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

function Customer() {
    const [customer, setCustomer] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();
    const size = 5;

    const [searchKhachHang, setSeachKhachHang] = useState({
        tenSearch: "",
        emailSearch: "",
        sdtSearch: "",
        gioiTinhSearch: "",
        trangThaiSearch: ""
    });

    const loadKhachHangSearch = async (searchParams, page) => {
        try {
            const params = {
                page: page,
                size: size,
                fullName: searchParams.tenSearch || undefined,
                email: searchParams.emailSearch || undefined,
                phone: searchParams.sdtSearch || undefined,
                gender: searchParams.gioiTinhSearch !== "" ? Number(searchParams.gioiTinhSearch) : undefined,
                status: searchParams.trangThaiSearch !== "" ? Number(searchParams.trangThaiSearch) : undefined,
            };

            Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

            const response = await axios.get('http://localhost:8080/api/customers', { params });
            const data = response.data;

            const mappedData = data.content.map(c => ({
                id: c.id,
                hoTen: c.fullName,
                email: c.email,
                sdt: c.phone,
                ngaySinh: c.dob,
                gioiTinh: c.gender,
                trangThai: c.status,
                avatar: null
            }));
            console.log(mappedData)

            setCustomer(mappedData);
            setPageCount(data.totalPages);
            setCurrentPage(data.number);
        } catch (error) {
            console.error('Failed to fetch customers', error);
        }
    };

    useEffect(() => {
        loadKhachHangSearch(searchKhachHang, currentPage);
    }, [searchKhachHang, currentPage]);

    const handleDelete = async (id) => {
        swal({
            title: 'Xác nhận xóa khách hàng?',
            text: 'Bạn có chắc chắn muốn xóa khách hàng này?',
            icon: 'warning',
            buttons: {
                cancel: "Hủy",
                confirm: "Xác nhận",
            },
        }).then(async (willConfirm) => {
            if (willConfirm) {
                try {
                    await axios.delete(`http://localhost:8080/api/customers/${id}`);

                    swal("Thành công!", "Khách hàng đã được xóa.", "success");

                    loadKhachHangSearch(searchKhachHang, currentPage);
                } catch (error) {
                    console.error("Error when deleting customer:", error);
                    swal("Lỗi!", "Có lỗi xảy ra khi xóa khách hàng.", "error");
                }
            }
        });
    };


    const handleEdit = (id) => {
        navigate(`/admin/tai-khoan/khach-hang/edit/${id}`);
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        loadKhachHangSearch(searchKhachHang, selectedPage);
    };

    return (
        <div>
            <div className="font-bold text-sm mb-4">
                Khách hàng
            </div>
            <div className="bg-white p-4 rounded-md shadow-lg">
                <div className="flex space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Tìm theo tên"
                        className="border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md px-4 py-2 text-gray-700 w-1/3"
                        value={searchKhachHang.tenSearch}
                        onChange={(e) =>
                            setSeachKhachHang({ ...searchKhachHang, tenSearch: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Tìm theo email"
                        className="border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md px-4 py-2 text-gray-700 w-1/3"
                        value={searchKhachHang.emailSearch}
                        onChange={(e) =>
                            setSeachKhachHang({ ...searchKhachHang, emailSearch: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Tìm theo SĐT"
                        className="border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md px-4 py-2 text-gray-700 w-1/3"
                        value={searchKhachHang.sdtSearch}
                        onChange={(e) =>
                            setSeachKhachHang({ ...searchKhachHang, sdtSearch: e.target.value })
                        }
                    />
                </div>

                <div className="flex space-x-4 pt-2 pb-4">
                    <div className="flex items-center space-x-2">
                        <label className="text-gray-700 font-semibold">Giới tính:</label>
                        <select
                            value={searchKhachHang.gioiTinhSearch}
                            onChange={(e) =>
                                setSeachKhachHang({ ...searchKhachHang, gioiTinhSearch: e.target.value })
                            }
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            <option value="">Tất cả</option>
                            <option value={0}>Nam</option>
                            <option value={1}>Nữ</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-gray-700 font-semibold">Trạng thái:</label>
                        <select
                            value={searchKhachHang.trangThaiSearch}
                            onChange={(e) =>
                                setSeachKhachHang({ ...searchKhachHang, trangThaiSearch: e.target.value })
                            }
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            <option value="">Tất cả</option>
                            <option value={1}>Hoạt động</option>
                            <option value={0}>Không hoạt động</option>
                        </select>
                    </div>

                    <div className="ml-auto flex space-x-4">
                        <Link to={'/admin/tai-khoan/khach-hang/add'}>
                            <button className="hover:bg-gray-400 border border-gray-300 font-medium py-2 px-4 rounded flex items-center space-x-1">
                                <AddIcon fontSize="small" /> <span>Tạo khách hàng</span>
                            </button>
                        </Link>
                    </div>
                </div>

                <table className="min-w-full text-center table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="py-2 px-4 border-b">STT</th>
                            <th className="py-2 px-4 border-b">Ảnh</th>
                            <th className="py-2 px-4 border-b">Họ tên</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">SĐT</th>
                            <th className="py-2 px-4 border-b">Ngày sinh</th>
                            <th className="py-2 px-4 border-b">Giới tính</th>
                            <th className="py-2 px-4 border-b">Trạng thái</th>
                            <th className="py-2 px-4 border-b">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.map((customer, index) => (
                            <tr key={customer.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{currentPage * size + index + 1}</td>
                                <td className="py-4 px-4 border-b">
                                    {customer.avatar ? (
                                        <img className="w-10 h-10 rounded-full" src={customer.avatar} alt="avatar" />
                                    ) : (
                                        <Avatar />
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">{customer.hoTen}</td>
                                <td className="py-2 px-4 border-b">{customer.email}</td>
                                <td className="py-2 px-4 border-b">{customer.sdt}</td>
                                <td className="py-2 px-4 border-b">
                                    {customer.ngaySinh
                                        ? new Date(customer.ngaySinh).toLocaleDateString('vi-VN')
                                        : ''}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {customer.gioiTinh === 0 ? 'Nam' : 'Nữ'}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <span
                                        className={`py-1 px-3 rounded-full text-xs ${customer.trangThai === 1
                                            ? 'bg-green-200 text-green-700 border border-green-800'
                                            : 'bg-red-200 text-red-700 border border-red-800'
                                            }`}
                                    >
                                        {customer.trangThai === 1 ? 'Hoạt động' : 'Không hoạt động'}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex space-x-2 justify-center">
                                        <button
                                            onClick={() => handleEdit(customer.id)}
                                            className="hover:bg-gray-400 font-medium py-2 px-4 rounded"
                                            title="Chỉnh sửa"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(customer.id)}
                                            className="hover:bg-gray-400 font-medium py-2 px-4 rounded"
                                            title="Thay đổi trạng thái"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-end mt-4">
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        containerClassName="pagination flex space-x-2"
                        pageLinkClassName="px-3 py-1 border rounded cursor-pointer"
                        activeClassName="bg-blue-500 text-white"
                        previousLinkClassName="px-3 py-1 border rounded cursor-pointer"
                        nextLinkClassName="px-3 py-1 border rounded cursor-pointer"
                        breakLinkClassName="px-3 py-1 border rounded cursor-pointer"
                        forcePage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default Customer;
