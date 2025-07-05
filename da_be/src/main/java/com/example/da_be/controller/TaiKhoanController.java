package com.example.da_be.controller;

import com.example.da_be.entity.TaiKhoan;
import com.example.da_be.exception.ResourceNotFoundException;
import com.example.da_be.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/tai-khoan")
public class TaiKhoanController {

    @Autowired
    private TaiKhoanService taiKhoanService;

    @GetMapping
    public List<TaiKhoan> getAllTaiKhoan() {
        return taiKhoanService.getAllTaiKhoan();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaiKhoan> getTaiKhoanById(@PathVariable Integer id) {
        try {
            TaiKhoan taiKhoan = taiKhoanService.getTaiKhoanById(id);
            return new ResponseEntity<>(taiKhoan, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createTaiKhoan(@RequestBody TaiKhoan taiKhoan) {
        try {
            TaiKhoan createdTaiKhoan = taiKhoanService.createTaiKhoan(taiKhoan);
            return new ResponseEntity<>(createdTaiKhoan, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaiKhoan> updateTaiKhoan(@PathVariable Integer id, @RequestBody TaiKhoan taiKhoan) {
        try {
            TaiKhoan updatedTaiKhoan = taiKhoanService.updateTaiKhoan(id, taiKhoan);
            return new ResponseEntity<>(updatedTaiKhoan, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaiKhoan(@PathVariable Integer id) {
        try {
            taiKhoanService.deleteTaiKhoan(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<TaiKhoan> getTaiKhoanByEmail(@PathVariable String email) {
        Optional<TaiKhoan> taiKhoan = taiKhoanService.findByEmail(email);
        return taiKhoan.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/sdt/{sdt}")
    public ResponseEntity<TaiKhoan> getTaiKhoanBySdt(@PathVariable String sdt) {
        Optional<TaiKhoan> taiKhoan = taiKhoanService.findBySdt(sdt);
        return taiKhoan.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
