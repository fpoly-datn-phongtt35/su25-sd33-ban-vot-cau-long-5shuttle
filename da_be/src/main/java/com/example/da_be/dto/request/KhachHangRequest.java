package com.example.da_be.dto.request;

import com.example.da_be.entity.TaiKhoan;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

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

    public TaiKhoan newKhachHang(TaiKhoan kh){
        kh.setHoTen(this.getHoTen());
        kh.setEmail(this.getEmail());
        kh.setSdt(this.getSdt());
        kh.setNgaySinh(this.getNgaySinh());
        kh.setGioiTinh(this.getGioiTinh());
        kh.setTrangThai(this.getTrangThai());
        return kh;
    }
}
