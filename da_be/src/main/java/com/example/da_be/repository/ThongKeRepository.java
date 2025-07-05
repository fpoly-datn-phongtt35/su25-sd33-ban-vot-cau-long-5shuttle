package com.example.da_be.repository;

import com.example.da_be.entity.HoaDon;
import com.example.da_be.entity.HoaDonCT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;
@Repository
public interface ThongKeRepository extends JpaRepository<HoaDon, Integer> {

    //Tổng tiền Ngày hôm nay
    @Query(value = """
        SELECT SUM(h.TongTien)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.NgayTao >= CURDATE()
          AND h.NgayTao < CURDATE() + INTERVAL 1 DAY;
""", nativeQuery = true)
    BigDecimal sumTongTienByCurrentDate();

    //Tổng tiền Tuần này
    @Query(value = """
        SELECT SUM(h.TongTien)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.NgayTao >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
          AND h.NgayTao < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY);
""", nativeQuery = true)
    BigDecimal sumTongTienByCurrentWeek();

    //Tổng tiền Tháng này
    @Query(value = """
        SELECT SUM(h.TongTien)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.NgayTao >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND h.NgayTao < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01');
        """, nativeQuery = true)
    BigDecimal sumTongTienByCurrentMonth();

    //Tổng tiền Năm nay
    @Query(value = """
        SELECT SUM(h.TongTien)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.NgayTao >= DATE_FORMAT(CURDATE(), '%Y-01-01')
        AND h.NgayTao < DATE_FORMAT(CURDATE() + INTERVAL 1 YEAR, '%Y-01-01');
        """, nativeQuery = true)
    BigDecimal sumTongTienByCurrentYear();

    //Tổng tiền Tùy chỉnh
    @Query(value = """
        SELECT SUM(h.TongTien)
        FROM 5SHUTTLE.HoaDon h
        WHERE DATE(h.NgayTao) >= :fromDate AND DATE(h.NgayTao) <= :toDate
                AND h.TrangThai = 6;
        """, nativeQuery = true)
    BigDecimal sumTongTienByCurrentDateRange(@Param("fromDate") Date fromDate, @Param("toDate") Date toDate);

    // Tìm mã hóa đơn có giá trị lớn nhất
    @Query(value = "SELECT MAX(CAST(SUBSTRING(h.Ma, 3) AS UNSIGNED)) FROM 5SHUTTLE.HoaDon h WHERE h.Ma LIKE 'HD%'", nativeQuery = true)
    Optional<Integer> findMaxNumericMaPart();


    // === Thống kê Tổng Sản phẩm đã bán ===

    // Tổng sản phẩm đã bán trong ngày hôm nay (tổng số lượng từng sản phẩm trong hóa đơn chi tiết)
    @Query(value = """
        SELECT SUM(hdct.SoLuong)
        FROM 5SHUTTLE.HoaDonCT hdct
        JOIN 5SHUTTLE.HoaDon hd ON hdct.IdHoaDon = hd.Id
        WHERE hd.NgayTao >= CURDATE() AND hd.NgayTao < CURDATE() + INTERVAL 1 DAY;
        """, nativeQuery = true)
    Integer countTotalProductsSoldByCurrentDate();

    // Tổng sản phẩm đã bán trong tuần này
    @Query(value = """
        SELECT SUM(hdct.SoLuong)
        FROM 5SHUTTLE.HoaDonCT hdct
        JOIN 5SHUTTLE.HoaDon hd ON hdct.IdHoaDon = hd.Id
        WHERE hd.NgayTao >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
        AND hd.NgayTao < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY);
        """, nativeQuery = true)
    Integer countTotalProductsSoldByCurrentWeek();

    // Tổng sản phẩm đã bán trong tháng này
    @Query(value = """
        SELECT SUM(hdct.SoLuong)
        FROM 5SHUTTLE.HoaDonCT hdct
        JOIN 5SHUTTLE.HoaDon hd ON hdct.IdHoaDon = hd.Id
        WHERE hd.NgayTao >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND hd.NgayTao < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01');
        """, nativeQuery = true)
    Integer countTotalProductsSoldByCurrentMonth();

    // Tổng sản phẩm đã bán trong năm nay
    @Query(value = """
        SELECT SUM(hdct.SoLuong)
        FROM 5SHUTTLE.HoaDonCT hdct
        JOIN 5SHUTTLE.HoaDon hd ON hdct.IdHoaDon = hd.Id
        WHERE hd.NgayTao >= DATE_FORMAT(CURDATE(), '%Y-01-01')
        AND hd.NgayTao < DATE_FORMAT(CURDATE() + INTERVAL 1 YEAR, '%Y-01-01');
        """, nativeQuery = true)
    Integer countTotalProductsSoldByCurrentYear();

    // Tổng sản phẩm đã bán theo khoảng ngày tùy chỉnh
    @Query(value = """
        SELECT SUM(hdct.SoLuong)
        FROM 5SHUTTLE.HoaDonCT hdct
        JOIN 5SHUTTLE.HoaDon hd ON hdct.IdHoaDon = hd.Id
        WHERE DATE(hd.NgayTao) >= :fromDate AND DATE(hd.NgayTao) <= :toDate
        """, nativeQuery = true)
    Integer countTotalProductsSoldByDateRange(@Param("fromDate") Date fromDate, @Param("toDate") Date toDate);


    // === Thống kê Đơn thành công (TrangThai = 6) ===

    // Tổng đơn thành công trong ngày hôm nay
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 6 AND h.NgayTao >= CURDATE() AND h.NgayTao < CURDATE() + INTERVAL 1 DAY;
        """, nativeQuery = true)
    Integer countSuccessfulOrdersByCurrentDate();

    // Tổng đơn thành công trong tuần này
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 6 AND h.NgayTao >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
        AND h.NgayTao < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY);
        """, nativeQuery = true)
    Integer countSuccessfulOrdersByCurrentWeek();

    // Tổng đơn thành công trong tháng này
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 6 AND h.NgayTao >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND h.NgayTao < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01');
        """, nativeQuery = true)
    Integer countSuccessfulOrdersByCurrentMonth();

    // Tổng đơn thành công trong năm nay
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 6 AND h.NgayTao >= DATE_FORMAT(CURDATE(), '%Y-01-01')
        AND h.NgayTao < DATE_FORMAT(CURDATE() + INTERVAL 1 YEAR, '%Y-01-01');
        """, nativeQuery = true)
    Integer countSuccessfulOrdersByCurrentYear();

    // Tổng đơn thành công theo khoảng ngày tùy chỉnh
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 6 AND DATE(h.NgayTao) >= :fromDate AND DATE(h.NgayTao) <= :toDate
        """, nativeQuery = true)
    Integer countSuccessfulOrdersByDateRange(@Param("fromDate") Date fromDate, @Param("toDate") Date toDate);


    // === Thống kê Đơn hủy (TrangThai = 7) ===

    // Tổng đơn hủy trong ngày hôm nay
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 7 AND h.NgayTao >= CURDATE() AND h.NgayTao < CURDATE() + INTERVAL 1 DAY;
        """, nativeQuery = true)
    Integer countCanceledOrdersByCurrentDate();

    // Tổng đơn hủy trong tuần này
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 7 AND h.NgayTao >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
        AND h.NgayTao < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY);
        """, nativeQuery = true)
    Integer countCanceledOrdersByCurrentWeek();

    // Tổng đơn hủy trong tháng này
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 7 AND h.NgayTao >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND h.NgayTao < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01');
        """, nativeQuery = true)
    Integer countCanceledOrdersByCurrentMonth();

    // Tổng đơn hủy trong năm nay
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 7 AND h.NgayTao >= DATE_FORMAT(CURDATE(), '%Y-01-01')
        AND h.NgayTao < DATE_FORMAT(CURDATE() + INTERVAL 1 YEAR, '%Y-01-01');
        """, nativeQuery = true)
    Integer countCanceledOrdersByCurrentYear();

    // Tổng đơn hủy theo khoảng ngày tùy chỉnh
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 7 AND DATE(h.NgayTao) >= :fromDate AND DATE(h.NgayTao) <= :toDate
        """, nativeQuery = true)
    Integer countCanceledOrdersByDateRange(@Param("fromDate") Date fromDate, @Param("toDate") Date toDate);


    // === Thống kê Đơn trả (TrangThai = 8) ===

    // Tổng đơn trả trong ngày hôm nay
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 8 AND h.NgayTao >= CURDATE() AND h.NgayTao < CURDATE() + INTERVAL 1 DAY;
        """, nativeQuery = true)
    Integer countReturnedOrdersByCurrentDate();

    // Tổng đơn trả trong tuần này
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 8 AND h.NgayTao >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
        AND h.NgayTao < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY);
        """, nativeQuery = true)
    Integer countReturnedOrdersByCurrentWeek();

    // Tổng đơn trả trong tháng này
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 8 AND h.NgayTao >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND h.NgayTao < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01');
        """, nativeQuery = true)
    Integer countReturnedOrdersByCurrentMonth();

    // Tổng đơn trả trong năm nay
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 8 AND h.NgayTao >= DATE_FORMAT(CURDATE(), '%Y-01-01')
        AND h.NgayTao < DATE_FORMAT(CURDATE() + INTERVAL 1 YEAR, '%Y-01-01');
        """, nativeQuery = true)
    Integer countReturnedOrdersByCurrentYear();

    // Tổng đơn trả theo khoảng ngày tùy chỉnh
    @Query(value = """
        SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 8 AND DATE(h.NgayTao) >= :fromDate AND DATE(h.NgayTao) <= :toDate
        """, nativeQuery = true)
    Integer countReturnedOrdersByDateRange(@Param("fromDate") Date fromDate, @Param("toDate") Date toDate);


}