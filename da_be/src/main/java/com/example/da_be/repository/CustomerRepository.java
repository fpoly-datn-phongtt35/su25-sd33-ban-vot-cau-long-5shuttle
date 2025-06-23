package com.example.da_be.repository;

import com.example.da_be.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);
    boolean existsByEmail(String email);
    @Query("SELECT c FROM Customer c WHERE " +
            "(:fullName IS NULL OR LOWER(c.fullName) LIKE LOWER(CONCAT('%', :fullName, '%'))) AND " +
            "(:email IS NULL OR LOWER(c.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
            "(:phone IS NULL OR c.phone LIKE CONCAT('%', :phone, '%')) AND " +
            "(:gender IS NULL OR c.gender = :gender) AND " +
            "(:status IS NULL OR c.status = :status)")
    Page<Customer> searchCustomers(
            @Param("fullName") String fullName,
            @Param("email") String email,
            @Param("phone") String phone,
            @Param("gender") Integer gender,
            @Param("status") Integer status,
            Pageable pageable
    );
}
