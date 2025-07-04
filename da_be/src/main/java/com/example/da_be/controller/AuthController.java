package com.example.da_be.controller;

import com.example.da_be.entity.User;
import com.example.da_be.repository.KhachHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private KhachHangRepository khachHangRepository;

    @GetMapping("/check-mail")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        Optional<User> customer = khachHangRepository.findByEmail(email);

        if (customer.isPresent()) {
            return ResponseEntity.ok().body(customer.get());
        } else {
            return ResponseEntity.ok().body(null);
        }
    }
}
