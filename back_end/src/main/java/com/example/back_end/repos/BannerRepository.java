package com.example.back_end.repos;

import com.example.back_end.models.entities.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Integer> {
    // Các phương thức tùy chỉnh nếu cần
}
