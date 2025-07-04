package com.example.da_be.repository;

import com.example.da_be.dto.response.KhachHangResponse;
import com.example.da_be.entity.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KhachHangRepository extends JpaRepository<TaiKhoan, Integer> {
    @Query("""
                SELECT new com.example.da_be.dto.response.KhachHangResponse(kh.id, kh.ma, kh.hoTen, kh.sdt, kh.email, kh.matKhau, kh.gioiTinh, kh.vaiTro, kh.avatar, kh.ngaySinh, kh.trangThai)
                FROM TaiKhoan kh
                WHERE kh.vaiTro = 2
            """)
    List<KhachHangResponse> getAllKhachHang();

    @Query(
            """
        SELECT new com.example.da_be.dto.response.KhachHangResponse(tk.id, tk.ma, tk.hoTen, tk.sdt, tk.email, tk.matKhau, tk.gioiTinh, tk.vaiTro, tk.avatar, tk.ngaySinh, tk.trangThai)
        FROM TaiKhoan tk
        WHERE tk.id = :id
"""
    )
    KhachHangResponse findKhachHangById(Integer id);

    @Query("""
                SELECT new com.example.da_be.dto.response.KhachHangResponse(
                    nv.id, nv.ma, nv.hoTen, nv.sdt, nv.email, nv.matKhau,
                    nv.gioiTinh, nv.vaiTro, nv.avatar, nv.ngaySinh, nv.trangThai)
                FROM TaiKhoan nv
                WHERE nv.vaiTro = 2
                  AND (:ten IS NULL OR nv.hoTen LIKE %:ten%)
                  AND (:email IS NULL OR nv.email LIKE %:email%)
                  AND (:sdt IS NULL OR nv.sdt LIKE %:sdt%)
                  AND (:gioiTinh IS NULL OR nv.gioiTinh = :gioiTinh)
                  AND (:trangThai IS NULL OR nv.trangThai = :trangThai)
                ORDER BY nv.id DESC
            """)
    Page<KhachHangResponse> searchKhachHang(
            @Param("ten") String ten,
            @Param("email") String email,
            @Param("sdt") String sdt,
            @Param("gioiTinh") Integer gioiTinh,
            @Param("trangThai") Integer trangThai,
            Pageable pageable
    );
    Optional<TaiKhoan> findByEmail(String email);

    boolean existsByEmail(String email);


}
