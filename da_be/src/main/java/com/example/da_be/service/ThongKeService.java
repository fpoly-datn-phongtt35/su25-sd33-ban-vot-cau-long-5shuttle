package com.example.da_be.service;

import com.example.da_be.dto.response.ThongKeResponse;
import com.example.da_be.dto.response.TopSellingProductResponse;
import com.example.da_be.mapper.ThongKeMapper;
import com.example.da_be.repository.ThongKeRepository;
import com.example.da_be.repository.TopSellingProductProjection;
import lombok.AccessLevel;
import com.example.da_be.repository.OrderStatsProjection;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class ThongKeService {

    ThongKeRepository thongKeRepository;
    ThongKeMapper thongKeMapper;

    public ThongKeResponse getThongKeByDate(){
        OrderStatsProjection stats = thongKeRepository.getStatsByCurrentDate();
        return thongKeMapper.toThongKeResponse(stats);
    }

    //Tuần
    public ThongKeResponse getThongKeByWeek(){
        OrderStatsProjection stats = thongKeRepository.getStatsByCurrentWeek();
        return thongKeMapper.toThongKeResponse(stats);
    }

    //Tháng
    public ThongKeResponse getThongKeByMonth(){
        OrderStatsProjection stats = thongKeRepository.getStatsByCurrentMonth();
        return thongKeMapper.toThongKeResponse(stats);
    }

    //Năm
    public ThongKeResponse getThongKeByYear(){
        OrderStatsProjection stats = thongKeRepository.getStatsByCurrentYear();
        return thongKeMapper.toThongKeResponse(stats);
    }

    //Tùy chỉnh
    public ThongKeResponse getThongKeByDateRange(Date fromDate, Date toDate){
        OrderStatsProjection stats = thongKeRepository.getStatsByDateRange(fromDate, toDate);
        return thongKeMapper.toThongKeResponse(stats);
    }


    public List<TopSellingProductResponse> getTopSellingProductsByDate() {
        List<TopSellingProductProjection> projections = thongKeRepository.findTopSellingProductsByCurrentDate();
        return thongKeMapper.toTopSellingProductResponseList(projections);
    }

    public List<TopSellingProductResponse> getTopSellingProductsByWeek() {
        List<TopSellingProductProjection> projections = thongKeRepository.findTopSellingProductsByCurrentWeek();
        return thongKeMapper.toTopSellingProductResponseList(projections);
    }

    public List<TopSellingProductResponse> getTopSellingProductsByMonth() {
        List<TopSellingProductProjection> projections = thongKeRepository.findTopSellingProductsByCurrentMonth();
        return thongKeMapper.toTopSellingProductResponseList(projections);
    }

    public List<TopSellingProductResponse> getTopSellingProductsByYear() {
        List<TopSellingProductProjection> projections = thongKeRepository.findTopSellingProductsByCurrentYear();
        return thongKeMapper.toTopSellingProductResponseList(projections);
    }

    public List<TopSellingProductResponse> getTopSellingProductsByDateRange(Date fromDate, Date toDate) {
        List<TopSellingProductProjection> projections = thongKeRepository.findTopSellingProductsByDateRange(fromDate, toDate);
        return thongKeMapper.toTopSellingProductResponseList(projections);
    }

//    //Ngày
//    public ThongKeResponse getThongKeByDate(){
//        return ThongKeResponse.builder()
//                .tongTien(thongKeRepository.sumTongTienByCurrentDate())
//                .tongSanPham(thongKeRepository.countTotalProductsSoldByCurrentDate())
//                .tongDonThanhCong(thongKeRepository.countSuccessfulOrdersByCurrentDate())
//                .tongDonHuy(thongKeRepository.countCanceledOrdersByCurrentDate())
//                .tongDonTra(thongKeRepository.countReturnedOrdersByCurrentDate())
//                .build();
//    }
//
//    //Tuần
//    public ThongKeResponse getThongKeByWeek(){
//        return ThongKeResponse.builder()
//                .tongTien(thongKeRepository.sumTongTienByCurrentWeek())
//                .tongSanPham(thongKeRepository.countTotalProductsSoldByCurrentWeek())
//                .tongDonThanhCong(thongKeRepository.countSuccessfulOrdersByCurrentWeek())
//                .tongDonHuy(thongKeRepository.countCanceledOrdersByCurrentWeek())
//                .tongDonTra(thongKeRepository.countReturnedOrdersByCurrentWeek())
//                .build();
//    }
//
//    //Tháng
//    public ThongKeResponse getThongKeByMonth(){
//        return ThongKeResponse.builder()
//                .tongTien(thongKeRepository.sumTongTienByCurrentMonth())
//                .tongSanPham(thongKeRepository.countTotalProductsSoldByCurrentMonth())
//                .tongDonThanhCong(thongKeRepository.countSuccessfulOrdersByCurrentMonth())
//                .tongDonHuy(thongKeRepository.countCanceledOrdersByCurrentMonth())
//                .tongDonTra(thongKeRepository.countReturnedOrdersByCurrentMonth())
//                .build();
//    }
//
//    //Năm
//    public ThongKeResponse getThongKeByYear(){
//        return ThongKeResponse.builder()
//                .tongTien(thongKeRepository.sumTongTienByCurrentYear())
//                .tongSanPham(thongKeRepository.countTotalProductsSoldByCurrentYear())
//                .tongDonThanhCong(thongKeRepository.countSuccessfulOrdersByCurrentYear())
//                .tongDonHuy(thongKeRepository.countCanceledOrdersByCurrentYear())
//                .tongDonTra(thongKeRepository.countReturnedOrdersByCurrentYear())
//                .build();
//    }
//
//    //Tùy chỉnh
//    public ThongKeResponse getThongKeByDateRange(Date fromDate, Date toDate){
//        return ThongKeResponse.builder()
//                .tongTien(thongKeRepository.sumTongTienByCurrentDateRange(fromDate, toDate))
//                .tongSanPham(thongKeRepository.countTotalProductsSoldByDateRange(fromDate, toDate))
//                .tongDonThanhCong(thongKeRepository.countSuccessfulOrdersByDateRange(fromDate, toDate))
//                .tongDonHuy(thongKeRepository.countCanceledOrdersByDateRange(fromDate, toDate))
//                .tongDonTra(thongKeRepository.countReturnedOrdersByDateRange(fromDate, toDate))
//                .build();
//    }
}
