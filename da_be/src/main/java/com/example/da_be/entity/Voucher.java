package com.example.da_be.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Voucher")
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Ma", length = 255)
    private String ma;

    @Column(name = "Ten", length = 255)
    private String ten;

    @Column(name = "GiaTri")
    private Integer giaTri;

    @Column(name = "GiaTriMax")
    private Integer giaTriMax;

    @Column(name = "DieuKienNhoNhat")
    private Integer dieuKienNhoNhat;

    @Column(name = "Kieu")
    private Integer kieu;

    @Column(name = "KieuGiaTri")
    private Integer kieuGiaTri;

    @Column(name = "SoLuong")
    private Integer soLuong;

    @Column(name = "NgayBatDau")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayBatDau;

    @Column(name = "NgayKetThuc")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayKetThuc;

    @Column(name = "TrangThai")
    private Integer trangThai;

    public Voucher() {
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMa() {
        return ma;
    }

    public void setMa(String ma) {
        this.ma = ma;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public Integer getGiaTri() {
        return giaTri;
    }

    public void setGiaTri(Integer giaTri) {
        this.giaTri = giaTri;
    }

    public Integer getGiaTriMax() {
        return giaTriMax;
    }

    public void setGiaTriMax(Integer giaTriMax) {
        this.giaTriMax = giaTriMax;
    }

    public Integer getDieuKienNhoNhat() {
        return dieuKienNhoNhat;
    }

    public void setDieuKienNhoNhat(Integer dieuKienNhoNhat) {
        this.dieuKienNhoNhat = dieuKienNhoNhat;
    }

    public Integer getKieu() {
        return kieu;
    }

    public void setKieu(Integer kieu) {
        this.kieu = kieu;
    }

    public Integer getKieuGiaTri() {
        return kieuGiaTri;
    }

    public void setKieuGiaTri(Integer kieuGiaTri) {
        this.kieuGiaTri = kieuGiaTri;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public Date getNgayBatDau() {
        return ngayBatDau;
    }

    public void setNgayBatDau(Date ngayBatDau) {
        this.ngayBatDau = ngayBatDau;
    }

    public Date getNgayKetThuc() {
        return ngayKetThuc;
    }

    public void setNgayKetThuc(Date ngayKetThuc) {
        this.ngayKetThuc = ngayKetThuc;
    }

    public Integer getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Integer trangThai) {
        this.trangThai = trangThai;
    }
}