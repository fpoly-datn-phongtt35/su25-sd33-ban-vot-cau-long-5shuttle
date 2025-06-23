package com.example.da_be.controller;

import com.example.da_be.entity.Address;
import com.example.da_be.entity.Customer;
import com.example.da_be.repository.AddressRepository;
import com.example.da_be.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/dia-chi")
@CrossOrigin(origins = "*")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/getAllDiaChi")
    public ResponseEntity<?> getAllDiaChi(
            @RequestParam("idTaiKhoan") Long customerId,
            @RequestParam(defaultValue = "0") int currentPage,
            @RequestParam(defaultValue = "5") int pageSize
    ) {
        Pageable pageable = PageRequest.of(currentPage, pageSize);

        Page<Address> addressPage = addressRepository.findByCustomerId(customerId, pageable);

        return ResponseEntity.ok(addressPage);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAddress(@RequestBody Map<String, Object> payload) {
        try {
            Long idTaiKhoan = Long.valueOf(payload.get("idTaiKhoan").toString());

            Optional<Customer> customerOpt = customerRepository.findById(idTaiKhoan);
            if (!customerOpt.isPresent()) {
                return ResponseEntity.status(404).body("Không tìm thấy khách hàng!");
            }

            Address address = new Address();
            address.setTen((String) payload.get("ten"));
            address.setSdt((String) payload.get("sdt"));
            address.setIdTinh((String) payload.get("idTinh"));
            address.setIdHuyen((String) payload.get("idHuyen"));
            address.setIdXa((String) payload.get("idXa"));
            address.setDiaChiCuThe((String) payload.get("diaChiCuThe"));
            address.setLoai((Integer) payload.getOrDefault("loai", 0));
            address.setCustomer(customerOpt.get());

            Address savedAddress = addressRepository.save(address);
            return ResponseEntity.ok(savedAddress);

        } catch (Exception e) {
            return ResponseEntity.status(400).body("Lỗi dữ liệu đầu vào: " + e.getMessage());
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAddress(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        Optional<Address> existingOpt = addressRepository.findById(id);
        if (!existingOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy địa chỉ!");
        }

        Address address = existingOpt.get();

        address.setTen((String) payload.get("ten"));
        address.setSdt((String) payload.get("sdt"));
        address.setIdTinh((String) payload.get("idTinh"));
        address.setIdHuyen((String) payload.get("idHuyen"));
        address.setIdXa((String) payload.get("idXa"));
        address.setDiaChiCuThe((String) payload.get("diaChiCuThe"));
        address.setLoai((Integer) payload.getOrDefault("loai", 0));

        if (payload.get("idTaiKhoan") != null) {
            Long idTaiKhoan = Long.valueOf(payload.get("idTaiKhoan").toString());
            Optional<Customer> customerOpt = customerRepository.findById(idTaiKhoan);
            customerOpt.ifPresent(address::setCustomer);
        }

        addressRepository.save(address);
        return ResponseEntity.ok("Cập nhật địa chỉ thành công!");
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id) {
        if (!addressRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy địa chỉ!");
        }
        addressRepository.deleteById(id);
        return ResponseEntity.ok("Xóa địa chỉ thành công!");
    }

    @PutMapping("/status")
    public ResponseEntity<?> updateDefaultAddress(
            @RequestParam Long idTaiKhoan,
            @RequestParam Long idDiaChi) {

        List<Address> addresses = addressRepository.findByCustomerId(idTaiKhoan);
        if (addresses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy địa chỉ cho khách hàng!");
        }

        boolean found = false;
        for (Address addr : addresses) {
            if (addr.getId().equals(idDiaChi)) {
                addr.setLoai(1);
                found = true;
            } else {
                addr.setLoai(0);
            }
            addressRepository.save(addr);
        }

        if (!found) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy địa chỉ để cập nhật!");
        }

        return ResponseEntity.ok("Cập nhật địa chỉ mặc định thành công!");
    }

}
