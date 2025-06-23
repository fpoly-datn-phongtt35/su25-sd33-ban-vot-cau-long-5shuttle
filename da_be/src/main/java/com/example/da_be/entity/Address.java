package com.example.da_be.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "addresses")
@Data
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ten;

    private String sdt;

    @Column(name = "id_tinh")
    private String idTinh;

    @Column(name = "id_huyen")
    private String idHuyen;

    @Column(name = "id_xa")
    private String idXa;

    @Column(name = "dia_chi_cu_the")
    private String diaChiCuThe;

    private Integer loai;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonBackReference
    private Customer customer;
}
