package com.example.da_be.controller;
import com.example.da_be.dto.DatHangRequestDTO;
import com.example.da_be.entity.*;
import com.example.da_be.exception.ResourceNotFoundException;
import com.example.da_be.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/dat-hang")
@CrossOrigin(origins = "http://localhost:5173")
public class DatHangController {

    private static final Logger log = LoggerFactory.getLogger(DatHangController.class);

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private SanPhamCTRepository sanPhamCTRepository;

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private HoaDonCTRepository hoaDonCTRepository;

    @Autowired
    private LichSuDonHangRepository lichSuDonHangRepository;

    @Autowired
    private ThongBaoRepository thongBaoRepository;

    @Transactional
    @PostMapping
    public ResponseEntity<?> datHang(@RequestBody DatHangRequestDTO orderRequest) {
        try {
            // Ghi log thông tin đầu vào
            log.info("Đặt hàng với thông tin: {}", orderRequest);

            // 1. Lấy tài khoản người đặt hàng
            TaiKhoan taiKhoan = taiKhoanRepository.findById(orderRequest.getIdTaiKhoan())
                    .orElseThrow(() -> new ResourceNotFoundException("Tài khoản không tồn tại"));

            List<DatHangRequestDTO.CartItemDTO> cartItems = orderRequest.getCartItems();

            if (cartItems == null || cartItems.isEmpty()) {
                return ResponseEntity.badRequest().body("Giỏ hàng trống");
            }

            // 2. Tính tổng tiền đơn hàng
            BigDecimal tongTien = BigDecimal.ZERO;
            for (DatHangRequestDTO.CartItemDTO item : cartItems) {
                SanPhamCT spct = sanPhamCTRepository.findById(item.getSanPhamCTId())
                        .orElseThrow(() -> new ResourceNotFoundException("Sản phẩm không tồn tại: " + item.getSanPhamCTId()));

                if (item.getSoLuong() > spct.getSoLuong()) {
                    return ResponseEntity.badRequest().body("Số lượng sản phẩm vượt quá tồn kho: " + spct.getSanPham().getTen());
                }

                BigDecimal gia = BigDecimal.valueOf(spct.getDonGia());
                if (gia == null) {
                    log.error("Giá sản phẩm không hợp lệ cho sản phẩm ID: {}", spct.getId());
                    return ResponseEntity.badRequest().body("Giá sản phẩm không hợp lệ.");
                }

                BigDecimal thanhTien = gia.multiply(BigDecimal.valueOf(item.getSoLuong()));
                tongTien = tongTien.add(thanhTien);
                log.info("Tính toán thành tiền cho sản phẩm ID: {}, thành tiền: {}", spct.getId(), thanhTien);
            }


            // 3. Tạo hóa đơn chính
            HoaDon hoaDon = new HoaDon();
            hoaDon.setTaiKhoan(taiKhoan); // Gán đối tượng TaiKhoan trực tiếp
            hoaDon.setMa("HD" + System.currentTimeMillis()); // Tạo mã hóa đơn
            hoaDon.setSoLuong(cartItems.size());
            hoaDon.setPhuongThucThanhToan("Thanh toán khi nhận hàng");
            hoaDon.setTenNguoiNhan(orderRequest.getThongTinGiaoHang().getHoTen());
            hoaDon.setSdtNguoiNhan(orderRequest.getThongTinGiaoHang().getSdt());
            hoaDon.setEmailNguoiNhan(orderRequest.getThongTinGiaoHang().getEmail());
            hoaDon.setDiaChiNguoiNhan(orderRequest.getThongTinGiaoHang().getDiaChiCuThe());
            hoaDon.setLoaiHoaDon("Trực tuyến");
//            hoaDon.setVoucher();
//            hoaDon.setPhiShip(0);
//            hoaDon.setTongTien(tongTien);
            hoaDon.setNgayTao(new Date());
            hoaDon.setTrangThai(1); // trạng thái mới tạo
            hoaDonRepository.save(hoaDon);

            // 4. Tạo hóa đơn chi tiết và trừ số lượng tồn kho
            for (DatHangRequestDTO.CartItemDTO item : cartItems) {
                SanPhamCT spct = sanPhamCTRepository.findById(item.getSanPhamCTId())
                        .orElseThrow(() -> new ResourceNotFoundException("Sản phẩm không tồn tại: " + item.getSanPhamCTId()));

                // Trừ số lượng trong kho
                int soLuongConLai = spct.getSoLuong() - item.getSoLuong();
                spct.setSoLuong(soLuongConLai);
                sanPhamCTRepository.save(spct);

                HoaDonCT hoaDonCT = new HoaDonCT();
                hoaDonCT.setHoaDon(hoaDon);
                hoaDonCT.setSanPhamCT(spct);
                hoaDonCT.setSoLuong(item.getSoLuong());
                hoaDonCT.setGiaBan(BigDecimal.valueOf(spct.getDonGia()));
                hoaDonCT.setTrangThai(1);
                hoaDonCTRepository.save(hoaDonCT);
            }

            // 5. Lưu lịch sử đơn hàng
            LichSuDonHang lichSuDonHang = new LichSuDonHang();
            lichSuDonHang.setIdTaiKhoan(taiKhoan.getId());
            lichSuDonHang.setIdHoaDon(hoaDon.getId());
            lichSuDonHang.setMoTa("Đặt hàng thành công");
            lichSuDonHang.setNgayTao(new Date());
            lichSuDonHang.setTrangThai(1);
            lichSuDonHangRepository.save(lichSuDonHang);

            // 6. Thêm thông báo cho người dùng
            ThongBao thongBao = new ThongBao();
            thongBao.setKhachHang(taiKhoan);
            thongBao.setTieuDe("Đặt hàng thành công");
            thongBao.setNoiDung("Đơn hàng của bạn đã được đặt thành công.");
            thongBao.setTrangThai(1);
            thongBaoRepository.save(thongBao);

            return ResponseEntity.ok("Đặt hàng thành công");
        } catch (Exception e) {
            log.error("Lỗi khi đặt hàng: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Lỗi khi đặt hàng: " + e.getMessage());
        }
    }
}
