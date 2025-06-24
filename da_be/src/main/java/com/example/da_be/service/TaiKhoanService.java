package com.example.da_be.service;

import com.example.da_be.entity.TaiKhoan;
import com.example.da_be.exception.ResourceNotFoundException;
import com.example.da_be.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanService {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    public List<TaiKhoan> getAllTaiKhoan() {
        return taiKhoanRepository.findAll();
    }

    public TaiKhoan getTaiKhoanById(Integer id) {
        return taiKhoanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài khoản với id " + id));
    }

    public TaiKhoan createTaiKhoan(TaiKhoan taiKhoan) {
        // Thêm logic kiểm tra trùng email, sdt trước khi tạo
        if (taiKhoanRepository.existsByEmail(taiKhoan.getEmail())) {
            throw new IllegalArgumentException("Email đã tồn tại");
        }
        if (taiKhoanRepository.existsBySdt(taiKhoan.getSdt())) {
            throw new IllegalArgumentException("Số điện thoại đã tồn tại");
        }
        return taiKhoanRepository.save(taiKhoan);
    }

    public TaiKhoan updateTaiKhoan(Integer id, TaiKhoan taiKhoan) {
        TaiKhoan existingTaiKhoan = taiKhoanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài khoản với id " + id));

        // Cập nhật thông tin tài khoản (trừ ID)
        existingTaiKhoan.setMa(taiKhoan.getMa());
        existingTaiKhoan.setHoTen(taiKhoan.getHoTen());
        existingTaiKhoan.setSdt(taiKhoan.getSdt());
        existingTaiKhoan.setEmail(taiKhoan.getEmail());
        existingTaiKhoan.setMatKhau(taiKhoan.getMatKhau());
        existingTaiKhoan.setGioiTinh(taiKhoan.getGioiTinh());
        existingTaiKhoan.setVaiTro(taiKhoan.getVaiTro());
        existingTaiKhoan.setAvatar(taiKhoan.getAvatar());
        existingTaiKhoan.setNgaySinh(taiKhoan.getNgaySinh());
        existingTaiKhoan.setCccd(taiKhoan.getCccd());
        existingTaiKhoan.setTrangThai(taiKhoan.getTrangThai());

        return taiKhoanRepository.save(existingTaiKhoan);
    }

    public void deleteTaiKhoan(Integer id) {
        taiKhoanRepository.deleteById(id);
    }

    public Optional<TaiKhoan> findByEmail(String email) {
        return taiKhoanRepository.findByEmail(email);
    }

    public Optional<TaiKhoan> findBySdt(String sdt) {
        return taiKhoanRepository.findBySdt(sdt);
    }
}
