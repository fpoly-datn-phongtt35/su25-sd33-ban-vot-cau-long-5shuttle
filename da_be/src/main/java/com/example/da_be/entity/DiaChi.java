package com.example.da_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String tinh;

    private String huyen;

    private String xa;

    private String diaChiCuThe;

    @ManyToOne
    @JoinColumn(name = "id_tai_khoan", referencedColumnName = "id")
    private TaiKhoan taiKhoan;

    public DiaChi newDiaChi(DiaChi diaChi) {
        diaChi.setTinh(this.tinh);
        diaChi.setHuyen(this.huyen);
        diaChi.setXa(this.xa);
        diaChi.setDiaChiCuThe(this.diaChiCuThe);
        return diaChi;
    }

}
