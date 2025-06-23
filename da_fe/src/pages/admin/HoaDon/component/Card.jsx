import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatisticCard = ({ title, icon, amount, stats, color, customWidth }) => {
  return (
    <Card
      sx={{
        backgroundColor: color,
        color: '#fff',
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: customWidth ? customWidth : '100%',
        maxWidth: customWidth ? undefined : 1170,
        minWidth: customWidth ? undefined : 575,
      }}
    >
      <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
            <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
              {icon}
            </Box>
            <Typography variant="h6" mb={1} sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem' } }}>
              {amount.toLocaleString()} ₫
            </Typography>
        </Box>

        <Box display="flex" justifyContent="space-around" flexWrap="wrap" mt={2}>
          <Box textAlign="center" flex="1" p={0.5}>
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Sản phẩm</Typography>
            <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>{stats.products}</Typography>
          </Box>
          <Box textAlign="center" flex="1" p={0.5}>
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Thành công</Typography>
            <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>{stats.success}</Typography>
          </Box>
          <Box textAlign="center" flex="1" p={0.5}>
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Đơn huỷ</Typography>
            <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>{stats.cancel}</Typography>
          </Box>
          <Box textAlign="center" flex="1" p={0.5}>
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Đơn trả</Typography>
            <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>{stats.return}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
