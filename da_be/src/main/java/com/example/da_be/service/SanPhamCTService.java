package com.example.da_be.service;


import com.example.da_be.dto.SanPhamCTListDTO;
import com.example.da_be.entity.HinhAnh;
import com.example.da_be.entity.SanPhamCT;
import com.example.da_be.exception.ResourceNotFoundException;
import com.example.da_be.repository.HinhAnhRepository;
import com.example.da_be.repository.SanPhamCTRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SanPhamCTService {
    @Autowired
    private SanPhamCTRepository sanPhamCTRepository;

    @Autowired
    private HinhAnhRepository HinhAnhRepository;
    @Autowired
    private HinhAnhRepository hinhAnhRepository;

    public List<SanPhamCT> getAllSanPhamCT() {
        return sanPhamCTRepository.findAll();
    }

    public SanPhamCT getSanPhamCTById(int id) {
        Optional<SanPhamCT> sanPhamCT = this.sanPhamCTRepository.findById(id);
        return sanPhamCT.orElseGet(SanPhamCT::new);
    }

    public SanPhamCT saveOrUpdateSanPhamCT(SanPhamCT sanPhamCT) {
        return this.sanPhamCTRepository.save(sanPhamCT);
    }

    public void deleteSanPhamCTById(int id) {
        this.sanPhamCTRepository.deleteById(id);
    }




    





    public List<SanPhamCT> getSanPhamCTByProductId(Integer productId) {
        return sanPhamCTRepository.findBySanPham_Id(productId);
    }


    public void updateHinhAnhUrls(int sanPhamCTId, List<String> hinhAnhUrls) {
        // Tìm sản phẩm chi tiết theo ID
        SanPhamCT sanPhamCT = sanPhamCTRepository.findById(sanPhamCTId)
                .orElseThrow(() -> new ResourceNotFoundException("SanPhamCT not found with id " + sanPhamCTId));

        // Xóa tất cả hình ảnh hiện tại
        List<HinhAnh> existingHinhAnhs = sanPhamCT.getHinhAnh();
        for (HinhAnh hinhAnh : existingHinhAnhs) {
            hinhAnhRepository.delete(hinhAnh);
        }

        // Thêm hình ảnh mới
        for (String url : hinhAnhUrls) {
            HinhAnh newHinhAnh = new HinhAnh();
            newHinhAnh.setLink(url);
            newHinhAnh.setTrangThai(1); // Ví dụ: 1 cho trạng thái hoạt động
            newHinhAnh.setSanPhamCT(sanPhamCT); // Thiết lập sản phẩm liên quan
            hinhAnhRepository.save(newHinhAnh);
        }
    }

    @Transactional
    public void updateQuantity(Long id, Integer soLuong) {
        SanPhamCT sanPhamCT = sanPhamCTRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sản phẩm chi tiết không tồn tại"));

        // Kiểm tra số lượng không âm
        if (soLuong < 0) {
            throw new IllegalArgumentException("Số lượng không được âm");
        }

        // Cập nhật tạm thời (cho việc điều chỉnh số lượng trong đơn hàng)
        sanPhamCT.setSoLuong(soLuong);
        sanPhamCTRepository.save(sanPhamCT);
    }




    public List<SanPhamCTListDTO> getAllSanPhamCTSummary() {
        List<SanPhamCT> sanPhamCTList = sanPhamCTRepository.findAll();
        return sanPhamCTList.stream().map(spct -> {
            String anhDaiDien = null;
            if (spct.getHinhAnh() != null && !spct.getHinhAnh().isEmpty()) {
                // lấy link ảnh đầu tiên làm ảnh đại diện
                anhDaiDien = spct.getHinhAnh().get(0).getLink();
            }
            return new SanPhamCTListDTO(
                    spct.getId(),
                    spct.getSanPham() != null ? spct.getSanPham().getTen() : null,
                    spct.getDonGia(),
                    anhDaiDien
            );
        }).collect(Collectors.toList());
    }
}
