import React from 'react';
import { Button, Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FilterBar = ({ filters, selectedFilter, onFilterChange, fromDate, toDate, onFromDateChange, onToDateChange, onExport }) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
    {filters.map((filter) => (
      <Button
        key={filter.value}
        variant={selectedFilter === filter.value ? 'contained' : 'outlined'}
        color={filter.value === 'Tùy chỉnh' ? 'warning' : 'primary'}
        onClick={() => onFilterChange(filter.value)}
      >
        {filter.label}
      </Button>
    ))}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Từ ngày"
        value={fromDate}
        onChange={onFromDateChange}
        slotProps={{ textField: { size: 'small' } }}
        maxDate={dayjs()}
      />
      <DatePicker
        label="Đến ngày"
        value={toDate}
        onChange={onToDateChange}
        slotProps={{ textField: { size: 'small' } }}
        maxDate={dayjs()}
        minDate={fromDate}
      />
    </LocalizationProvider>
    <Button variant="outlined" color="success" onClick={onExport}>EXPORT TO EXCEL</Button>
  </Box>
);

export default FilterBar; 