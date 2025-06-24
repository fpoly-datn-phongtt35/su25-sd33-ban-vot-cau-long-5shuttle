package com.example.da_be.service.impl;

import com.example.da_be.cloudinary.CloudinaryImage;
import com.example.da_be.dto.request.NhanVienRequest;
import com.example.da_be.dto.response.NhanVienResponse;
import com.example.da_be.entity.TaiKhoan;
import com.example.da_be.repository.NhanVienRepository;
import com.example.da_be.service.NhanVienService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@Service
public class NhanVienServiceImpl implements NhanVienService {
    @Autowired
    private NhanVienRepository repository;
    @Autowired
    private CloudinaryImage cloudinaryImage;

    @Override
    @Transactional
    public TaiKhoan add(NhanVienRequest nhanVienRequest) throws ParseException {
        String setMaNV = "NV" + repository.findAll().size();
        TaiKhoan nv = TaiKhoan.builder()
                .ma(setMaNV)
                .hoTen(nhanVienRequest.getHoTen())
                .sdt(nhanVienRequest.getSdt())
                .email(nhanVienRequest.getEmail())
                .ngaySinh(nhanVienRequest.getNgaySinh())
                .gioiTinh(nhanVienRequest.getGioiTinh())
                .vaiTro(nhanVienRequest.getVaiTro())
                .cccd(nhanVienRequest.getCccd())
                .trangThai(nhanVienRequest.getTrangThai())
                .build();

        if(nhanVienRequest.getAvatar() != null) {
            nv.setAvatar(cloudinaryImage.uploadAvatar(nhanVienRequest.getAvatar()));
        }

//        String matKhau = generatePassword();
//        String[] toMail = {nhanVienRequest.getEmail()};
//        Email email = new Email();
//        email.setBody("<b style=\"text-align: center;\">" + matKhau + "</b>");
//        email.setToEmail(toMail);
//        email.setSubject("Tạo tài khoản thành công");
//        email.setTitleEmail("Mật khẩu đăng nhập là:");
//        emailSender.sendEmail(email);
//        nv.setMatKhau(matKhau);
        return repository.save(nv);
    }

    @Override
    public List<NhanVienResponse> getAllNhanVien() {
        return repository.getAllNhanVien();
    }

    @Override
    public NhanVienResponse getNhanVienById(Integer id) {
        return repository.findNhanVienById(id);
    }

    @Override
    public TaiKhoan delete(Integer id) {
        TaiKhoan nv = repository.findById(id).orElse(null);
        assert nv != null;
        if (nv.getTrangThai() == 0) {
            nv.setTrangThai(1);
        } else {
            nv.setTrangThai(0);
        }
        return repository.save(nv);
    }

    @Override
    @Transactional
    public Boolean update(NhanVienRequest request, Integer id) throws ParseException {
        Optional<TaiKhoan> optional = repository.findById(id);
        if (optional.isPresent()) {
            TaiKhoan nv = request.tranStaff(optional.get());
            if (request.getAvatar() != null) {
                nv.setAvatar(cloudinaryImage.uploadAvatar(request.getAvatar()));
            }
            repository.save(nv);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Page<NhanVienResponse> searchNhanVien(
            String ten,
            String email,
            String sdt,
            Integer gioiTinh,
            Integer trangThai,
            Pageable pageable
    ) {
        return repository.searchNhanVien(ten, email, sdt, gioiTinh, trangThai, pageable);
    }

}
