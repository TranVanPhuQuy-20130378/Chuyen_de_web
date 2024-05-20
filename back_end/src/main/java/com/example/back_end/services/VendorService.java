package com.example.back_end.services;

import com.example.back_end.models.entities.Vendor;
import com.example.back_end.repos.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    // Phương thức để lấy tất cả các vendor
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    // Phương thức để lấy một vendor theo ID
    public Optional<Vendor> getVendorById(Integer id) {
        return vendorRepository.findById(id);
    }

    // Phương thức để lưu hoặc cập nhật một vendor
    public Vendor saveOrUpdateVendor(Vendor vendor) {
        return vendorRepository.save(vendor);
    }

    // Phương thức để xóa một vendor
    public void deleteVendor(Integer id) {
        vendorRepository.deleteById(id);
    }
}

