import React, { useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Avatar, TablePagination, Typography
} from '@mui/material';

const mockProductsByFilter = {
  'Ngày': [
    {
      img: 'https://example.com/balen-grey.jpg',
      name: 'Balen Grey 2023 - Tím - Bạc',
      quantity: 5,
      price: 550000,
      sizes: '40,41',
    },
    {
      img: 'https://example.com/converse-venom.jpg',
      name: 'Converse Venom - Tím - Da',
      quantity: 3,
      price: 950000,
      sizes: '41',
    },
  ],
  'Tuần': [
    {
      img: 'https://example.com/balen-blue.jpg',
      name: 'Balen Grey 2023 - Xanh dương',
      quantity: 10,
      price: 490000,
      sizes: '40,42',
    },
    {
      img: 'https://example.com/kkkk-blue.jpg',
      name: 'Kkkk - Xanh dương - Sắt',
      quantity: 7,
      price: 100000,
      sizes: '40',
    },
  ],
  'Tháng': [
    {
      img: 'https://example.com/kkkk-purple.jpg',
      name: 'Kkkk - Tím - Sắt',
      quantity: 15,
      price: 700000,
      sizes: '41',
    },
    {
      img: 'https://example.com/balen-grey.jpg',
      name: 'Balen Grey 2023 - Tím - Bạc',
      quantity: 12,
      price: 550000,
      sizes: '40,41,42',
    },
  ],
  'Năm': [
    {
      img: 'https://example.com/converse-venom.jpg',
      name: 'Converse Venom - Tím - Da',
      quantity: 30,
      price: 950000,
      sizes: '41',
    },
    {
      img: 'https://example.com/balen-blue.jpg',
      name: 'Balen Grey 2023 - Xanh dương',
      quantity: 25,
      price: 490000,
      sizes: '40,42',
    },
  ],
  'Tùy chỉnh': [
    {
      img: 'https://example.com/kkkk-blue.jpg',
      name: 'Kkkk - Xanh dương - Sắt',
      quantity: 9,
      price: 100000,
      sizes: '40',
    },
    {
      img: 'https://example.com/kkkk-purple.jpg',
      name: 'Kkkk - Tím - Sắt',
      quantity: 9,
      price: 700000,
      sizes: '41',
    },
  ],
};

const TableBestSelling = ({ filterLabel }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const products = mockProductsByFilter[filterLabel] || [];

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography textAlign={'center'} variant="h6" gutterBottom sx={{ color: 'black' }}>
        Danh sách sản phẩm bán chạy theo {filterLabel}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ảnh</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Giá tiền</TableCell>
            <TableCell>Kích cỡ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar src={product.img} variant="square" />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{ maxWidth: 300, whiteSpace: 'normal', wordBreak: 'break-word' }}
                  >
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price.toLocaleString()} ₫</TableCell>
                <TableCell>{product.sizes}</TableCell>
              </TableRow>
          ))}
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
    </>
  );
};

export default TableBestSelling;
