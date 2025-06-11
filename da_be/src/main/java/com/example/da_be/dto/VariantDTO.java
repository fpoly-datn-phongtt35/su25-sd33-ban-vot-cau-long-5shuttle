package com.example.da_be.dto;

import java.util.List;

public class VariantDTO {
    private Integer id;
    private String mauSacTen;
    private String trongLuongTen;
    private Double donGia;
    private Integer soLuong;
    private List<String> hinhAnhUrls;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMauSacTen() {
        return mauSacTen;
    }

    public void setMauSacTen(String mauSacTen) {
        this.mauSacTen = mauSacTen;
    }

    public String getTrongLuongTen() {
        return trongLuongTen;
    }

    public void setTrongLuongTen(String trongLuongTen) {
        this.trongLuongTen = trongLuongTen;
    }

    public Double getDonGia() {
        return donGia;
    }

    public void setDonGia(Double donGia) {
        this.donGia = donGia;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public List<String> getHinhAnhUrls() {
        return hinhAnhUrls;
    }

    public void setHinhAnhUrls(List<String> hinhAnhUrls) {
        this.hinhAnhUrls = hinhAnhUrls;
    }
}
