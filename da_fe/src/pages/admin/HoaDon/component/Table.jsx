import React, { useState, useEffect } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Avatar, TablePagination, Typography, CircularProgress, Alert, Box, Skeleton
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

const getTopSellingApiUrl = (filter, fromDate, toDate) => {
  switch (filter) {
    case 'Ngày':
      return 'http://localhost:8080/shuttle/thong-ke/top-selling/ngay';
    case 'Tuần':
      return 'http://localhost:8080/shuttle/thong-ke/top-selling/tuan';
    case 'Tháng':
      return 'http://localhost:8080/shuttle/thong-ke/top-selling/thang';
    case 'Năm':
      return 'http://localhost:8080/shuttle/thong-ke/top-selling/nam';
    case 'Tùy chỉnh':
      return `http://localhost:8080/shuttle/thong-ke/top-selling/tuy-chinh?fromDate=${fromDate.format('YYYY-MM-DD')}&toDate=${toDate.format('YYYY-MM-DD')}`;
    default:
      return '';
  }
};

const TableBestSelling = ({ filterLabel, fromDate, toDate, loading = false }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      setError(null);
      try {
        const url = getTopSellingApiUrl(filterLabel, fromDate, toDate);
        const response = await axios.get(url);
        setProducts(response.data || []);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu top-selling:', err);
        setError('Không thể tải dữ liệu sản phẩm bán chạy');
        setProducts([]);
      }
    };

    fetchTopSellingProducts();
  }, [filterLabel, fromDate, toDate]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Typography textAlign={'center'} variant="h6" gutterBottom sx={{ color: 'black' }}>
        Danh sách sản phẩm bán chạy theo {filterLabel}
      </Typography>
      <Box sx={{ width: '100%', minWidth: 530, minHeight: 400, position: 'relative' }}>
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
              borderRadius: 1
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  {loading ? (
                    <Box sx={{ py: 2 }}>
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </Box>
                  ) : (
                    "Không có dữ liệu"
                  )}
                </TableCell>
              </TableRow>
            ) : (
              products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ maxWidth: 300, whiteSpace: 'normal', wordBreak: 'break-word' }}
                      >
                        {product.name || product.tenSanPham}
                      </Typography>
                    </TableCell>
                    <TableCell>{product.quantity || product.soLuongDaBan}</TableCell>
                    <TableCell>{(product.price || product.giaTien || 0).toLocaleString()} ₫</TableCell>
                  </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default TableBestSelling;
