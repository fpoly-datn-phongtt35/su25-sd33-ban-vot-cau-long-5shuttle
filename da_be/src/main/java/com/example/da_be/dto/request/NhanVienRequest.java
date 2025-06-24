package com.example.da_be.dto.request;

import com.example.da_be.entity.TaiKhoan;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NhanVienRequest {

    private String hoTen;

    private String email;

    private String matKhau;

    private String sdt;

    private LocalDate ngaySinh;

    private Integer gioiTinh;

    private MultipartFile avatar;

    private String cccd;

    private Integer vaiTro;

    private Integer trangThai = 0;

    public TaiKhoan tranStaff(TaiKhoan nv) throws ParseException {
        nv.setHoTen(this.getHoTen());
        nv.setSdt(this.getSdt());
        nv.setEmail(this.getEmail());
        nv.setGioiTinh(this.getGioiTinh());
        nv.setVaiTro(this.getVaiTro());
        nv.setNgaySinh(this.getNgaySinh());
        nv.setCccd(this.getCccd());
        nv.setTrangThai(this.getTrangThai());
        return nv;
    }
}
