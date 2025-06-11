package com.example.da_be.repository;

import com.example.da_be.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Integer> {

    Optional<TaiKhoan> findByEmail(String email);

    Optional<TaiKhoan> findBySdt(String sdt);

    boolean existsByEmail(String email);

    boolean existsBySdt(String sdt);
}
