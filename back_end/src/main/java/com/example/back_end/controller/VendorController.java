package com.example.back_end.controller;

import com.example.back_end.models.entities.Vendor;
import com.example.back_end.services.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    // API để lấy tất cả các vendors
    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorService.getAllVendors();
    }

    // API để lấy một vendor theo ID
    @GetMapping("/{id}")
    public Optional<Vendor> getVendorById(@PathVariable Integer id) {
        return vendorService.getVendorById(id);
    }

    // API để lưu hoặc cập nhật một vendor
    @PostMapping
    public Vendor saveOrUpdateVendor(@RequestBody Vendor vendor) {
        return vendorService.saveOrUpdateVendor(vendor);
    }

    // API để xóa một vendor
    @DeleteMapping("/{id}")
    public void deleteVendor(@PathVariable Integer id) {
        vendorService.deleteVendor(id);
    }
}
