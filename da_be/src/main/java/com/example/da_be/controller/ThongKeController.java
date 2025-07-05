package com.example.da_be.controller;

import com.example.da_be.dto.response.ThongKeResponse;
import com.example.da_be.service.ThongKeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin(origins = "http://localhost:5173")
@RestController()
@RequestMapping("/thong-ke")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ThongKeController {

    ThongKeService thongKeService;

    @GetMapping("/ngay")
    public ThongKeResponse getThongKeByDate(){
        return thongKeService.getThongKeByDate();
    }

    @GetMapping("/tuan")
    public ThongKeResponse getThongKeByWeek(){
        return thongKeService.getThongKeByWeek();
    }

    @GetMapping("/thang")
    public ThongKeResponse getThongKeByMonth(){
        return thongKeService.getThongKeByMonth();
    }

    @GetMapping("/nam")
    public ThongKeResponse getThongKeByYear(){
        return thongKeService.getThongKeByYear();
    }

    @GetMapping("/tuy-chinh")
    public ThongKeResponse getThongKeByDateRange(
            @RequestParam("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fromDate,
            @RequestParam("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date toDate) {
        return thongKeService.getThongKeByDateRange(fromDate, toDate);
    }


}
