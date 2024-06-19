package com.example.back_end.repos;

import com.example.back_end.models.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VendorRepository extends JpaRepository<Vendor, Integer> {
    // Custom methods can be defined here if needed

    Vendor findById(int id);
    Vendor findByVendorName(String name);
}
