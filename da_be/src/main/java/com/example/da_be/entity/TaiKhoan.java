package com.example.da_be.entity;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TaiKhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String ma;

    private String hoTen;

    private String email;

    private String matKhau;

    private String sdt;

    private LocalDate ngaySinh;

    private Integer gioiTinh;

    private String avatar;

    private String cccd;

    private Integer vaiTro;

    private Integer trangThai;

}