package com.example.da_be.service.impl;

import com.example.da_be.dto.request.KhachHangRequest;
import com.example.da_be.dto.response.KhachHangResponse;
import com.example.da_be.entity.Role;
import com.example.da_be.entity.User;
import com.example.da_be.repository.KhachHangRepository;
import com.example.da_be.repository.RoleRepository;
import com.example.da_be.service.KhachHangSevice;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class KhachHangSeviceImpl implements KhachHangSevice {
    @Autowired
    private KhachHangRepository repository;

    @Autowired
    private RoleRepository roleRepository;
    //    @Autowired
//    private Cloud
    @Override
    public List<KhachHangResponse> getAllKhachHang() {
        return repository.getAllKhachHang();
    }

    @Override
    @Transactional
    public User addKhachHang(KhachHangRequest request) throws ParseException {
        String setMaKH = "KH" + repository.findAll().size();

        Optional<Role> userRoleOptional = roleRepository.findByName("USER");

        Role userRole;
        if (userRoleOptional.isPresent()) {
            userRole = userRoleOptional.get();
        } else {
            throw new RuntimeException("Role 'USER' not found in database.");
        }

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);

        User kh = User.builder()
                .ma(setMaKH)
                .hoTen(request.getHoTen())
                .sdt(request.getSdt())
                .email(request.getEmail())
                .ngaySinh(request.getNgaySinh())
                .gioiTinh(request.getGioiTinh())
                .matKhau("123")
                .roles(roles)
                .trangThai(1)
                .build();
//        if (request.getAvatar() != null){
////            kh.setAvatar(clo);
//        }

//        String matKhau = generatePassword();
//        String[] toMail = {nhanVienRequest.getEmail()};
//        Email email = new Email();
//        email.setBody("<b style=\"text-align: center;\">" + matKhau + "</b>");
//        email.setToEmail(toMail);
//        email.setSubject("Tạo tài khoản thành công");
//        email.setTitleEmail("Mật khẩu đăng nhập là:");
//        emailSender.sendEmail(email);
//        nv.setMatKhau(matKhau);
        return repository.save(kh);
    }

    @Override
    public Boolean updateKhachHang(KhachHangRequest request, Integer id) throws ParseException {
        Optional<User> optional = repository.findById(id);
        if (optional.isPresent()) {
            User kh = optional.get();
            Optional<Role> userRoleOptional = roleRepository.findByName("USER");
            Role userRole;
            if (userRoleOptional.isPresent()) {
                userRole = userRoleOptional.get();
            } else {
                throw new RuntimeException("Role 'USER' not found in database for update operation.");
            }
            kh = request.newKhachHang(kh, userRole);

            System.out.println(request.getTrangThai());
            kh.setTrangThai(request.getTrangThai());
            repository.save(kh);
            return true;
        }else {
            return false;
        }
    }

    @Override
    public KhachHangResponse getKhachHangById(Integer id) {
        return repository.findKhachHangById(id);
    }

    @Override
    public User deleteKhachHangById(Integer id) {
        User kh = repository.findById(id).orElse(null);
        assert kh != null;
        if(kh.getTrangThai() == 0){
            kh.setTrangThai(1);
        }else {
            kh.setTrangThai(0);
        }
        return repository.save(kh);
    }

    @Override
    public Page<KhachHangResponse> searchKhachHang(
            String ten,
            String email,
            String sdt,
            Integer gioiTinh,
            Integer trangThai,
            Pageable pageable) {
        return repository.searchKhachHang(ten, email, sdt, gioiTinh, trangThai, pageable);
    }
}
