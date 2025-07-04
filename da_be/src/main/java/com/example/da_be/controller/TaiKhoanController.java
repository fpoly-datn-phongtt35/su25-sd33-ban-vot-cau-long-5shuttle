package com.example.da_be.controller;

import com.example.da_be.entity.User;
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
    public List<User> getAllTaiKhoan() {
        return taiKhoanService.getAllTaiKhoan();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getTaiKhoanById(@PathVariable Integer id) {
        try {
            User taiKhoan = taiKhoanService.getTaiKhoanById(id);
            return new ResponseEntity<>(taiKhoan, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createTaiKhoan(@RequestBody User taiKhoan) {
        try {
            User createdTaiKhoan = taiKhoanService.createTaiKhoan(taiKhoan);
            return new ResponseEntity<>(createdTaiKhoan, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateTaiKhoan(@PathVariable Integer id, @RequestBody User taiKhoan) {
        try {
            User updatedTaiKhoan = taiKhoanService.updateTaiKhoan(id, taiKhoan);
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
    public ResponseEntity<User> getTaiKhoanByEmail(@PathVariable String email) {
        Optional<User> taiKhoan = taiKhoanService.findByEmail(email);
        return taiKhoan.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/sdt/{sdt}")
    public ResponseEntity<User> getTaiKhoanBySdt(@PathVariable String sdt) {
        Optional<User> taiKhoan = taiKhoanService.findBySdt(sdt);
        return taiKhoan.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
