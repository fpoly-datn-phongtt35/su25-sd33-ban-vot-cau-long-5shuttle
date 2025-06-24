package com.example.da_be.service;

import com.example.da_be.dto.response.ThongKeResponse;
import com.example.da_be.repository.ThongKeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ThongKeService {

    ThongKeRepository thongKeRepository;

    //Ngày
    public ThongKeResponse getThongKeByDate(){
        return ThongKeResponse.builder()
                .tongTien(thongKeRepository.sumTongTienByCurrentDate())
                .tongSanPham(thongKeRepository.countTotalProductsSoldByCurrentDate())
                .tongDonThanhCong(thongKeRepository.countSuccessfulOrdersByCurrentDate())
                .tongDonHuy(thongKeRepository.countCanceledOrdersByCurrentDate())
                .tongDonTra(thongKeRepository.countReturnedOrdersByCurrentDate())
                .build();
    }

    //Tuần
    public ThongKeResponse getThongKeByWeek(){
        return ThongKeResponse.builder()
                .tongTien(thongKeRepository.sumTongTienByCurrentWeek())
                .tongSanPham(thongKeRepository.countTotalProductsSoldByCurrentWeek())
                .tongDonThanhCong(thongKeRepository.countSuccessfulOrdersByCurrentWeek())
                .tongDonHuy(thongKeRepository.countCanceledOrdersByCurrentWeek())
                .tongDonTra(thongKeRepository.countReturnedOrdersByCurrentWeek())
                .build();
    }

    //Tháng
    public ThongKeResponse getThongKeByMonth(){
        return ThongKeResponse.builder()
                .tongTien(thongKeRepository.sumTongTienByCurrentMonth())
                .tongSanPham(thongKeRepository.countTotalProductsSoldByCurrentMonth())
                .tongDonThanhCong(thongKeRepository.countSuccessfulOrdersByCurrentMonth())
                .tongDonHuy(thongKeRepository.countCanceledOrdersByCurrentMonth())
                .tongDonTra(thongKeRepository.countReturnedOrdersByCurrentMonth())
                .build();
    }

    //Năm
    public ThongKeResponse getThongKeByYear(){
        return ThongKeResponse.builder()
                .tongTien(thongKeRepository.sumTongTienByCurrentYear())
                .tongSanPham(thongKeRepository.countTotalProductsSoldByCurrentYear())
                .tongDonThanhCong(thongKeRepository.countSuccessfulOrdersByCurrentYear())
                .tongDonHuy(thongKeRepository.countCanceledOrdersByCurrentYear())
                .tongDonTra(thongKeRepository.countReturnedOrdersByCurrentYear())
                .build();
    }

    //Tùy chỉnh
    public ThongKeResponse getThongKeByDateRange(Date fromDate, Date toDate){
        return ThongKeResponse.builder()
                .tongTien(thongKeRepository.sumTongTienByCurrentDateRange(fromDate, toDate))
                .tongSanPham(thongKeRepository.countTotalProductsSoldByDateRange(fromDate, toDate))
                .tongDonThanhCong(thongKeRepository.countSuccessfulOrdersByDateRange(fromDate, toDate))
                .tongDonHuy(thongKeRepository.countCanceledOrdersByDateRange(fromDate, toDate))
                .tongDonTra(thongKeRepository.countReturnedOrdersByDateRange(fromDate, toDate))
                .build();
    }



}
