package com.example.da_be.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "HoaDonCT")
public class HoaDonCT {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "IdSanPhamCT")
    private Integer idSanPhamCT;

    @Column(name = "IdHoaDon")
    private Integer idHoaDon;

    @Column(name = "SoLuong")
    private Integer soLuong;

    @Column(name = "GiaBan", precision = 10, scale = 2)
    private BigDecimal giaBan;

    @Column(name = "TrangThai")
    private Integer trangThai;

    public HoaDonCT() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdSanPhamCT() {
        return idSanPhamCT;
    }

    public void setIdSanPhamCT(Integer idSanPhamCT) {
        this.idSanPhamCT = idSanPhamCT;
    }

    public Integer getIdHoaDon() {
        return idHoaDon;
    }

    public void setIdHoaDon(Integer idHoaDon) {
        this.idHoaDon = idHoaDon;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public BigDecimal getGiaBan() {
        return giaBan;
    }

    public void setGiaBan(BigDecimal giaBan) {
        this.giaBan = giaBan;
    }

    public Integer getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Integer trangThai) {
        this.trangThai = trangThai;
    }
}

