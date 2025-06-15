package com.example.da_be.controller;

import com.example.da_be.entity.HoaDon;
import com.example.da_be.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Cho phép kết nối từ React
@RequestMapping("/api/hoa-don")
public class HoaDonController {

    @Autowired
    private HoaDonService hoaDonService;

    // Lấy danh sách tất cả hóa đơn
    @GetMapping
    public List<HoaDon> getAllHoaDon() {
        return hoaDonService.getAllHoaDon();
    }

    // Lấy thông tin hóa đơn theo id
    @GetMapping("/{id}")
    public HoaDon getHoaDonById(@PathVariable int id) {
        return hoaDonService.getHoaDonById(id);
    }

    // Xóa hóa đơn theo id
    @DeleteMapping("/{id}")
    public void deleteHoaDon(@PathVariable int id) {
        hoaDonService.deleteHoaDonById(id);
    }

    // Thêm hóa đơn mới
    @PostMapping
    public HoaDon addHoaDon(@RequestBody HoaDon hoaDon) {
        return hoaDonService.saveOrUpdateHoaDon(hoaDon);
    }

    // Cập nhật thông tin hóa đơn
    @PutMapping("/{id}")
    public HoaDon updateHoaDon(@PathVariable int id, @RequestBody HoaDon hoaDon) {
        hoaDon.setId(id);  // Đảm bảo ID trong body và path là giống nhau
        return hoaDonService.saveOrUpdateHoaDon(hoaDon);
    }


    @PutMapping("/{id}/status")
    public ResponseEntity<HoaDon> updateHoaDonStatus(@PathVariable int id, @RequestBody int newStatus) {
        HoaDon updatedHoaDon = hoaDonService.updateHoaDonStatus(id, newStatus);
        if (updatedHoaDon != null) {
            return ResponseEntity.ok(updatedHoaDon);
        }
        return ResponseEntity.notFound().build();
    }

}
