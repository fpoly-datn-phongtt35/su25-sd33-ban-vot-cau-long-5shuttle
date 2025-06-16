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

    // @Column(name = "Ma", nullable = false)
    // private String ma;

    // @Column(name = "HoTen", nullable = false)
    // private String hoTen;

    // @Column(name = "Sdt", length = 255)
    // private String sdt;

    // @Column(name = "Email", nullable = false)
    // private String email;

    // @Column(name = "MatKhau", nullable = false)
    // private String matKhau;

    // @Column(name = "GioiTinh")
    // private Boolean gioiTinh;

    // @Column(name = "VaiTro", length = 255)
    // private String vaiTro;

    // @Column(name = "Avatar", columnDefinition = "TEXT")
    // private String avatar;

    // @Column(name = "NgaySinh")
    // private Date ngaySinh;

    // @Column(name = "CCCD", length = 50)
    // private String cccd;

    // @Column(name = "TrangThai")
    // private Integer trangThai;

    // // Constructors
    // public TaiKhoan() {
    // }

    // public TaiKhoan(Integer id, String ma, String hoTen, String sdt, String email, String matKhau, Boolean gioiTinh, String vaiTro, String avatar, Date ngaySinh, String cccd, Integer trangThai) {
    //     this.id = id;
    //     this.ma = ma;
    //     this.hoTen = hoTen;
    //     this.sdt = sdt;
    //     this.email = email;
    //     this.matKhau = matKhau;
    //     this.gioiTinh = gioiTinh;
    //     this.vaiTro = vaiTro;
    //     this.avatar = avatar;
    //     this.ngaySinh = ngaySinh;
    //     this.cccd = cccd;
    //     this.trangThai = trangThai;
    // }

    // // Getters and Setters
    // public Integer getId() {
    //     return id;
    // }

    // public void setId(Integer id) {
    //     this.id = id;
    // }

    // public String getMa() {
    //     return ma;
    // }

    // public void setMa(String ma) {
    //     this.ma = ma;
    // }

    // public String getHoTen() {
    //     return hoTen;
    // }

    // public void setHoTen(String hoTen) {
    //     this.hoTen = hoTen;
    // }

    // public String getSdt() {
    //     return sdt;
    // }

    // public void setSdt(String sdt) {
    //     this.sdt = sdt;
    // }

    // public String getEmail() {
    //     return email;
    // }

    // public void setEmail(String email) {
    //     this.email = email;
    // }

    // public String getMatKhau() {
    //     return matKhau;
    // }

    // public void setMatKhau(String matKhau) {
    //     this.matKhau = matKhau;
    // }

    // public Boolean getGioiTinh() {
    //     return gioiTinh;
    // }

    // public void setGioiTinh(Boolean gioiTinh) {
    //     this.gioiTinh = gioiTinh;
    // }

    // public String getVaiTro() {
    //     return vaiTro;
    // }

    // public void setVaiTro(String vaiTro) {
    //     this.vaiTro = vaiTro;
    // }

    // public String getAvatar() {
    //     return avatar;
    // }

    // public void setAvatar(String avatar) {
    //     this.avatar = avatar;
    // }

    // public Date getNgaySinh() {
    //     return ngaySinh;
    // }

    // public void setNgaySinh(Date ngaySinh) {
    //     this.ngaySinh = ngaySinh;
    // }

    // public String getCccd() {
    //     return cccd;
    // }

    // public void setCccd(String cccd) {
    //     this.cccd = cccd;
    // }

    // public Integer getTrangThai() {
    //     return trangThai;
    // }

    // public void setTrangThai(Integer trangThai) {
    //     this.trangThai = trangThai;
    // }
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
