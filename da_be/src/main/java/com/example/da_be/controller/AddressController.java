//package com.example.da_be.controller;
//
//import com.example.da_be.entity.DiaChi;
//import com.example.da_be.entity.User;
//import com.example.da_be.repository.DiaChiRepository;
//import com.example.da_be.repository.KhachHangRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/dia-chi")
//@CrossOrigin(origins = "*")
//public class AddressController {
//
//    @Autowired
//    private DiaChiRepository addressRepository;
//
//    @Autowired
//    private KhachHangRepository customerRepository;
//
//    @GetMapping("/getAllDiaChi")
//    public ResponseEntity<?> getAllDiaChi(
//            @RequestParam("idTaiKhoan") Integer customerId,
//            @RequestParam(defaultValue = "0") int currentPage,
//            @RequestParam(defaultValue = "5") int pageSize
//    ) {
//        Pageable pageable = PageRequest.of(currentPage, pageSize);
//
//        Page<DiaChi> addressPage = addressRepository.findByTaiKhoanId(customerId, pageable);
//
//        return ResponseEntity.ok(addressPage);
//    }
//
//    @PostMapping("/create")
//    public ResponseEntity<?> createAddress(@RequestBody Map<String, Object> payload) {
//        try {
//            Integer idTaiKhoan = Integer.valueOf(payload.get("idTaiKhoan").toString());
//
//            Optional<User> customerOpt = customerRepository.findById(idTaiKhoan);
//            if (!customerOpt.isPresent()) {
//                return ResponseEntity.status(404).body("Không tìm thấy khách hàng!");
//            }
//
//            DiaChi address = new DiaChi();
//            address.setTen((String) payload.get("ten"));
//            address.setSdt((String) payload.get("sdt"));
//            address.setIdTinh((String) payload.get("idTinh"));
//            address.setIdHuyen((String) payload.get("idHuyen"));
//            address.setIdXa((String) payload.get("idXa"));
//            address.setDiaChiCuThe((String) payload.get("diaChiCuThe"));
//            address.setLoai((Integer) payload.getOrDefault("loai", 0));
//            address.setIdUser(customerOpt.get());
//
//            DiaChi savedAddress = addressRepository.save(address);
//            return ResponseEntity.ok(savedAddress);
//
//        } catch (Exception e) {
//            return ResponseEntity.status(400).body("Lỗi dữ liệu đầu vào: " + e.getMessage());
//        }
//    }
//
//
//    @PutMapping("/update/{id}")
//    public ResponseEntity<?> updateAddress(@PathVariable Integer id, @RequestBody Map<String, Object> payload) {
//        Optional<DiaChi> existingOpt = addressRepository.findById(id);
//        if (!existingOpt.isPresent()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy địa chỉ!");
//        }
//
//        DiaChi address = existingOpt.get();
//
//        address.setTen((String) payload.get("ten"));
//        address.setSdt((String) payload.get("sdt"));
//        address.setIdTinh((String) payload.get("idTinh"));
//        address.setIdHuyen((String) payload.get("idHuyen"));
//        address.setIdXa((String) payload.get("idXa"));
//        address.setDiaChiCuThe((String) payload.get("diaChiCuThe"));
//        address.setLoai((Integer) payload.getOrDefault("loai", 0));
//
//        if (payload.get("idTaiKhoan") != null) {
//            Integer idTaiKhoan = Integer.valueOf(payload.get("idTaiKhoan").toString());
//            Optional<User> customerOpt = customerRepository.findById(idTaiKhoan);
//            customerOpt.ifPresent(address::setIdUser);
//        }
//
//        addressRepository.save(address);
//        return ResponseEntity.ok("Cập nhật địa chỉ thành công!");
//    }
//
//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> deleteAddress(@PathVariable Integer id) {
//        if (!addressRepository.existsById(id)) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy địa chỉ!");
//        }
//        addressRepository.deleteById(id);
//        return ResponseEntity.ok("Xóa địa chỉ thành công!");
//    }
//
//    @PutMapping("/status")
//    public ResponseEntity<?> updateDefaultAddress(
//            @RequestParam Integer idTaiKhoan,
//            @RequestParam Integer idDiaChi) {
//
//        List<DiaChi> addresses = addressRepository.findByTaiKhoanId(idTaiKhoan);
//        if (addresses.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(Map.of("message", "Không tìm thấy địa chỉ cho khách hàng!"));
//
//        }
//
//        boolean found = false;
//        for (DiaChi addr : addresses) {
//            if (addr.getId() == idDiaChi) {
//                addr.setLoai(1);
//                found = true;
//            } else {
//                addr.setLoai(0);
//            }
//            addressRepository.save(addr);
//        }
//
//        if (!found) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(Map.of("message", "Không tìm thấy địa chỉ để cập nhật!"));
//
//        }
//
//        return ResponseEntity.ok("Cập nhật địa chỉ mặc định thành công!");
//    }
//
//}
