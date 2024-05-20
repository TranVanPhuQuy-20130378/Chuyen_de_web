package com.example.back_end.repos;

import com.example.back_end.models.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Integer> {
    // Các phương thức tùy chỉnh nếu cần
}

