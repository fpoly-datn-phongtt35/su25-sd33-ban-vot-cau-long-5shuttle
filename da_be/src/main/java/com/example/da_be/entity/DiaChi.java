package com.example.da_be.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "DiaChi")

public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Ten")
    private String ten;

    @Column(name = "Sdt")
    private String sdt;

    @Column(name = "id_tinh")
    private String idTinh;

    @Column(name = "id_huyen")
    private String idHuyen;

    @Column(name = "id_xa")
    private String idXa;

    @Column(name = "dia_chi_cu_the")
    private String diaChiCuThe;

    @Column(name = "LoaiDiaChi")
    private Integer loai;

    @ManyToOne
    @JoinColumn(name = "IdUser")
    @JsonBackReference
    private User IdUser;
}
