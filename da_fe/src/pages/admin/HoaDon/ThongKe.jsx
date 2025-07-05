import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';

import FilterBar from './component/FilterBar';
import StatisticCardsGroup from './component/StatisticCardsGroup';
import StatusPieChart from './component/StatusPieChart';
import TableBestSelling from './component/Table';
import TableOutOfStock from './component/TableOutOfStock';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DateRangeIcon from '@mui/icons-material/DateRange';

const FILTERS = [
    { label: 'NGÀY', value: 'Ngày' },
    { label: 'TUẦN', value: 'Tuần' },
    { label: 'THÁNG', value: 'Tháng' },
    { label: 'NĂM', value: 'Năm' },
    { label: 'TÙY CHỈNH', value: 'Tùy chỉnh' },
];

const ICONS = {
    'Ngày': <CalendarTodayIcon />,
    'Tuần': <CalendarViewWeekIcon />,
    'Tháng': <CalendarMonthIcon />,
    'Năm': <DateRangeIcon />,
    'Tùy chỉnh': <EditCalendarIcon />,
};

const COLOR_CARDS = {
    'Ngày': '#00838f',
    'Tuần': '#f57c00',
    'Tháng': '#90a4ae',
    'Năm': '#0d47a1',
    'Tùy chỉnh': '#3399FF',
};

const getApiUrl = (filter, fromDate, toDate) => {
  switch (filter) {
    case 'Ngày':
      return 'http://localhost:8080/shuttle/thong-ke/ngay';
    case 'Tuần':
      return 'http://localhost:8080/shuttle/thong-ke/tuan';
    case 'Tháng':
      return 'http://localhost:8080/shuttle/thong-ke/thang';
    case 'Năm':
      return 'http://localhost:8080/shuttle/thong-ke/nam';
    case 'Tùy chỉnh':
      return `http://localhost:8080/shuttle/thong-ke/tuy-chinh?fromDate=${fromDate.format('YYYY-MM-DD')}&toDate=${toDate.format('YYYY-MM-DD')}`;
    default:
      return '';
  }
};

const ThongKe = () => {
    const [selectedFilter, setSelectedFilter] = useState('Ngày');
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [allCardsData, setAllCardsData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);

    useEffect(() => {
        const fetchAllCards = async () => {
            const cards = await Promise.all(
                FILTERS.map(async (filter) => {
                    try {
                        const url = getApiUrl(filter.value, fromDate, toDate);
                        const res = await axios.get(url);
                        const data = res.data;
                        let title = `Tổng quan ${filter.value.toLowerCase()}`;
                        if (filter.value === 'Tùy chỉnh') {
                            title = `Tùy chỉnh (${fromDate.format('DD-MM-YYYY')} - ${toDate.format('DD-MM-YYYY')})`;
                        }
                        return {
                            id: filter.value,
                            title: title,
                            icon: ICONS[filter.value],
                            amount: data.tongTien || 0,
                            stats: {
                                products: data.tongSanPham || 0,
                                success: data.tongDonThanhCong || 0,
                                cancel: data.tongDonHuy || 0,
                                return: data.tongDonTra || 0,
                            },
                            color: COLOR_CARDS[filter.value],
                            customWidth: filter.value === 'Tùy chỉnh' ? 1180 : 575,
                        };
                    } catch (error) {
                        // Nếu lỗi thì trả về card rỗng
                        return {
                            id: filter.value,
                            title: `Tổng quan ${filter.value.toLowerCase()}`,
                            icon: ICONS[filter.value],
                            amount: 0,
                            stats: { products: 0, success: 0, cancel: 0, return: 0 },
                            color: COLOR_CARDS[filter.value],
                            customWidth: filter.value === 'Tùy chỉnh' ? 1180 : 575,
                        };
                    }
                })
            );
            setAllCardsData(cards);
        };

        fetchAllCards();
    }, [fromDate, toDate]);

    useEffect(() => {
        const fetchPieChartData = async () => {
            try {
                const url = getApiUrl(selectedFilter, fromDate, toDate);
                const res = await axios.get(url);
                const data = res.data;
                setPieChartData([
                    { name: 'Thành công', value: data.tongDonThanhCong || 0 },
                    { name: 'Đơn hủy', value: data.tongDonHuy || 0 },
                    { name: 'Đơn trả', value: data.tongDonTra || 0 },
                ]);
            } catch (error) {
                setPieChartData([
                    { name: 'Thành công', value: 0 },
                    { name: 'Đơn hủy', value: 0 },
                    { name: 'Đơn trả', value: 0 },
                ]);
            }
        };
        fetchPieChartData();
    }, [selectedFilter, fromDate, toDate]);

    const handleFilterChange = (newFilter) => {
        setSelectedFilter(newFilter);
    };
    
    const handleExport = () => {
        console.log("Đã nhấn nút Export Excel");
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Thống kê
            </Typography>

            <Box mb={3}>
                <StatisticCardsGroup cards={allCardsData} />
            </Box>

            <FilterBar
                filters={FILTERS}
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={setFromDate}
                onToDateChange={setToDate}
                onExport={handleExport}
            />

            <Grid container spacing={3} mt={0.1}>
                <Grid item xs={12} md={8}>
                    <TableBestSelling filterLabel={selectedFilter} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatusPieChart
                        data={pieChartData}
                        label={selectedFilter.toLowerCase()}
                        colors={[
                            COLOR_CARDS[selectedFilter] || '#00838f', // Thành công
                            '#f44336', // Đơn hủy
                            '#9c27b0', // Đơn trả
                        ]}
                    />
                </Grid>
            </Grid>

            <Box mt={4}>
                <TableOutOfStock />
            </Box>
        </Box>
    );
};

export default ThongKe;
