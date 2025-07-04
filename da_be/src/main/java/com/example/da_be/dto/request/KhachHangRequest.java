package com.example.da_be.dto.request;

import com.example.da_be.entity.Role;
import com.example.da_be.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class KhachHangRequest {

    private String hoTen;

    private String email;

    private String sdt;

    private LocalDate ngaySinh;

    private Integer gioiTinh;

    private String avatar;

    private Integer vaiTro;

    private Integer trangThai;

    public User newKhachHang(User kh, Role userRole){
        kh.setHoTen(this.getHoTen());
        kh.setEmail(this.getEmail());
        kh.setSdt(this.getSdt());
        kh.setNgaySinh(this.getNgaySinh());
        kh.setGioiTinh(this.getGioiTinh());
        kh.setTrangThai(this.getTrangThai());

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        kh.setRoles(roles);
        return kh;
    }
}
