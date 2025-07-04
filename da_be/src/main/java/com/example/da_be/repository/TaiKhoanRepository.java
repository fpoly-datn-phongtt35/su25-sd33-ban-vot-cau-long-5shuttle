package com.example.da_be.repository;

import com.example.da_be.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaiKhoanRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findBySdt(String sdt);

    boolean existsByEmail(String email);

    boolean existsBySdt(String sdt);
}
