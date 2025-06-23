package com.example.da_be.controller;

import com.example.da_be.entity.Customer;
import com.example.da_be.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/check-mail")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        Optional<Customer> customer = customerRepository.findByEmail(email);

        if (customer.isPresent()) {
            return ResponseEntity.ok().body(customer.get());
        } else {
            return ResponseEntity.ok().body(null);
        }
    }
}
