package com.example.da_be.repository;

import com.example.da_be.entity.HoaDonCT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoaDonCTRepository extends JpaRepository<HoaDonCT, Integer> {
}
