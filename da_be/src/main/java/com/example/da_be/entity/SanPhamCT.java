package com.example.da_be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "SanPhamCT")
public class SanPhamCT {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "IdSanPham")
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn(name = "IdThuongHieu")
    private ThuongHieu thuongHieu;

    @ManyToOne
    @JoinColumn(name = "IdMauSac")
    private MauSac mauSac;

    @ManyToOne
    @JoinColumn(name = "IdChatLieu")
    private ChatLieu chatLieu;

    @ManyToOne
    @JoinColumn(name = "IdTrongLuong")
    private TrongLuong trongLuong;

    @ManyToOne
    @JoinColumn(name = "IdDiemCanBang")
    private DiemCanBang diemCanBang;

    @ManyToOne
    @JoinColumn(name = "IdDoCung")
    private DoCung doCung;

    @Column(name = "Ma")
    private String ma;

    @Column(name = "SoLuong")
    private Integer soLuong;

    @Column(name = "DonGia")
    private Double donGia;

    @Column(name = "MoTa")
    private String moTa;

    @Column(name = "TrangThai")
    private Integer trangThai;

    @OneToMany(mappedBy = "sanPhamCT")
    @JsonIgnore
    private List<HinhAnh> hinhAnh;


    public SanPhamCT() {
    }

    public SanPhamCT(Integer id, SanPham sanPham, ThuongHieu thuongHieu, MauSac mauSac, ChatLieu chatLieu, TrongLuong trongLuong, DiemCanBang diemCanBang, DoCung doCung, String ma, Integer soLuong, Double donGia, String moTa, Integer trangThai, List<HinhAnh> hinhAnh) {
        this.id = id;
        this.sanPham = sanPham;
        this.thuongHieu = thuongHieu;
        this.mauSac = mauSac;
        this.chatLieu = chatLieu;
        this.trongLuong = trongLuong;
        this.diemCanBang = diemCanBang;
        this.doCung = doCung;
        this.ma = ma;
        this.soLuong = soLuong;
        this.donGia = donGia;
        this.moTa = moTa;
        this.trangThai = trangThai;
        this.hinhAnh = hinhAnh;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public SanPham getSanPham() {
        return sanPham;
    }

    public void setSanPham(SanPham sanPham) {
        this.sanPham = sanPham;
    }

    public ThuongHieu getThuongHieu() {
        return thuongHieu;
    }

    public void setThuongHieu(ThuongHieu thuongHieu) {
        this.thuongHieu = thuongHieu;
    }

    public MauSac getMauSac() {
        return mauSac;
    }

    public void setMauSac(MauSac mauSac) {
        this.mauSac = mauSac;
    }

    public ChatLieu getChatLieu() {
        return chatLieu;
    }

    public void setChatLieu(ChatLieu chatLieu) {
        this.chatLieu = chatLieu;
    }

    public TrongLuong getTrongLuong() {
        return trongLuong;
    }

    public void setTrongLuong(TrongLuong trongLuong) {
        this.trongLuong = trongLuong;
    }

    public DiemCanBang getDiemCanBang() {
        return diemCanBang;
    }

    public void setDiemCanBang(DiemCanBang diemCanBang) {
        this.diemCanBang = diemCanBang;
    }

    public DoCung getDoCung() {
        return doCung;
    }

    public void setDoCung(DoCung doCung) {
        this.doCung = doCung;
    }

    public String getMa() {
        return ma;
    }

    public void setMa(String ma) {
        this.ma = ma;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public Double getDonGia() {
        return donGia;
    }

    public void setDonGia(Double donGia) {
        this.donGia = donGia;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public Integer getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Integer trangThai) {
        this.trangThai = trangThai;
    }

    public List<HinhAnh> getHinhAnh() {
        return hinhAnh;
    }

    public void setHinhAnh(List<HinhAnh> hinhAnh) {
        this.hinhAnh = hinhAnh;
    }
}
