package com.example.da_be.controller;


import com.example.da_be.dto.SanPhamCTDetailDTO;
import com.example.da_be.dto.SanPhamCTFullDTO;
import com.example.da_be.dto.SanPhamCTListDTO;
import com.example.da_be.entity.SanPham;
import com.example.da_be.entity.SanPhamCT;
import com.example.da_be.exception.ResourceNotFoundException;
import com.example.da_be.repository.SanPhamCTRepository;
import com.example.da_be.service.SanPhamCTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/san-pham-ct")
public class SanPhamCTController {

    @Autowired
    private SanPhamCTService sanPhamCTService;

    @Autowired
    private SanPhamCTRepository sanPhamCTRepository;

    // Lấy danh sách tất cả sản phẩm chi tiết
    @GetMapping
    public List<SanPhamCT> getAllSanPhamCT() {
        return sanPhamCTService.getAllSanPhamCT();
    }

    // Lấy thông tin sản phẩm chi tiết theo id
    @GetMapping("/{id}")
    public ResponseEntity<SanPhamCT> getSanPhamCTById(@PathVariable int id) {
        SanPhamCT sanPhamCT = sanPhamCTService.getSanPhamCTById(id);
        if (sanPhamCT.getId() == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(sanPhamCT, HttpStatus.OK);
    }

    // Xóa sản phẩm chi tiết theo id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSanPhamCT(@PathVariable int id) {
        sanPhamCTService.deleteSanPhamCTById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Thêm sản phẩm chi tiết mới
    @PostMapping
    public ResponseEntity<SanPhamCT> addSanPhamCT(@RequestBody SanPhamCT sanPhamCT) {
        SanPhamCT createdSanPhamCT = sanPhamCTService.saveOrUpdateSanPhamCT(sanPhamCT);
        return new ResponseEntity<>(createdSanPhamCT, HttpStatus.CREATED);
    }

    // Cập nhật thông tin sản phẩm chi tiết
//    @PutMapping("/{id}")
//    public ResponseEntity<SanPhamCT> updateSanPhamCTT(@PathVariable int id, @RequestBody SanPhamCT sanPhamCT) {
//        sanPhamCT.setId(id);  // Đảm bảo ID trong body và path là giống nhau
//        SanPhamCT updatedSanPhamCT = sanPhamCTService.saveOrUpdateSanPhamCT(sanPhamCT);
//        return new ResponseEntity<>(updatedSanPhamCT, HttpStatus.OK);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<SanPhamCT> updateSanPhamCT(@PathVariable int id, @RequestBody SanPhamCT sanPhamCT) {
        SanPhamCT existingSanPhamCT = sanPhamCTRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SanPhamCT not found"));

        // Cập nhật các thuộc tính của SanPhamCT
        existingSanPhamCT.setSoLuong(sanPhamCT.getSoLuong());
        existingSanPhamCT.setDonGia(sanPhamCT.getDonGia());
        existingSanPhamCT.setTrangThai(sanPhamCT.getTrangThai());
        existingSanPhamCT.setMoTa(sanPhamCT.getMoTa());


        // Cập nhật thông tin sản phẩm
        SanPham existingSanPham = existingSanPhamCT.getSanPham();
        existingSanPham.setTen(sanPhamCT.getSanPham().getTen());

        // Cập nhật các mối quan hệ
        existingSanPhamCT.setThuongHieu(sanPhamCT.getThuongHieu());
        existingSanPhamCT.setChatLieu(sanPhamCT.getChatLieu());
        existingSanPhamCT.setDiemCanBang(sanPhamCT.getDiemCanBang());
        existingSanPhamCT.setDoCung(sanPhamCT.getDoCung());
        existingSanPhamCT.setMauSac(sanPhamCT.getMauSac());
        existingSanPhamCT.setTrongLuong(sanPhamCT.getTrongLuong());

        sanPhamCTRepository.save(existingSanPhamCT);

        return ResponseEntity.ok(existingSanPhamCT);
    }




    @GetMapping("/sp")
    public List<SanPhamCT> getAllSanPhamCT(@RequestParam(required = false) Integer productId) {
        if (productId != null) {
            return sanPhamCTService.getSanPhamCTByProductId(productId);
        }
        return sanPhamCTService.getAllSanPhamCT();
    }

    @PutMapping("/with-images/{id}")
    public ResponseEntity<Void> updateHinhAnhUrls(@PathVariable int id, @RequestBody List<String> hinhAnhUrls) {
        sanPhamCTService.updateHinhAnhUrls(id, hinhAnhUrls);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update-quantity/{id}")
    public ResponseEntity<?> updateQuantity(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> payload
    ) {
        try {
            Integer soLuong = payload.get("soLuong");
            sanPhamCTService.updateQuantity(id, soLuong);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Sản phẩm không tồn tại");
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra: " + e.getMessage());
        }
    }





    @GetMapping("/summary")
    public ResponseEntity<List<SanPhamCTListDTO>> getAllSanPhamCTSummary() {
        List<SanPhamCTListDTO> dtoList = sanPhamCTService.getAllSanPhamCTSummary();
        return ResponseEntity.ok(dtoList);
    }



    @GetMapping("/{id}/detaill")
    public ResponseEntity<SanPhamCTDetailDTO> getSanPhamCTDetail(@PathVariable int id) {
        SanPhamCTDetailDTO detailDTO = sanPhamCTService.getSanPhamCTDetail(id);
        return new ResponseEntity<>(detailDTO, HttpStatus.OK);
    }

    @GetMapping("/all-with-image")
    public ResponseEntity<List<SanPhamCTFullDTO>> getAllSanPhamCTWithImage() {
        List<SanPhamCTFullDTO> dtoList = sanPhamCTService.getAllSanPhamCTWithImage();
        return ResponseEntity.ok(dtoList);
    }
}

