package com.example.da_be.repository;

import com.example.da_be.dto.response.NhanVienResponse;
import com.example.da_be.entity.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NhanVienRepository extends JpaRepository<TaiKhoan, Integer> {
    @Query("""
                SELECT new com.example.da_be.dto.response.NhanVienResponse(nv.id, nv.ma, nv.hoTen, nv.sdt, nv.email, nv.matKhau, nv.gioiTinh, nv.vaiTro, nv.avatar, nv.ngaySinh, nv.cccd, nv.trangThai)
                FROM TaiKhoan nv
                WHERE nv.vaiTro IN (0, 1)
            """)
    List<NhanVienResponse> getAllNhanVien();

    @Query(
            """
        SELECT new com.example.da_be.dto.response.NhanVienResponse(tk.id, tk.ma, tk.hoTen, tk.sdt, tk.email, tk.matKhau, tk.gioiTinh, tk.vaiTro, tk.avatar, tk.ngaySinh, tk.cccd, tk.trangThai)
        FROM TaiKhoan tk
        WHERE tk.id = :id
"""
    )
    NhanVienResponse findNhanVienById(Integer id);

    @Query("""
                SELECT new com.example.da_be.dto.response.NhanVienResponse(
                    nv.id, nv.ma, nv.hoTen, nv.sdt, nv.email, nv.matKhau,
                    nv.gioiTinh, nv.vaiTro, nv.avatar, nv.ngaySinh, nv.cccd, nv.trangThai)
                FROM TaiKhoan nv
                WHERE nv.vaiTro IN (0, 1)
                  AND (:ten IS NULL OR nv.hoTen LIKE %:ten%)
                  AND (:email IS NULL OR nv.email LIKE %:email%)
                  AND (:sdt IS NULL OR nv.sdt LIKE %:sdt%)
                  AND (:gioiTinh IS NULL OR nv.gioiTinh = :gioiTinh)
                  AND (:trangThai IS NULL OR nv.trangThai = :trangThai)
                ORDER BY nv.id DESC
            """)
    Page<NhanVienResponse> searchNhanVien(
            @Param("ten") String ten,
            @Param("email") String email,
            @Param("sdt") String sdt,
            @Param("gioiTinh") Integer gioiTinh,
            @Param("trangThai") Integer trangThai,
            Pageable pageable
    );

}
