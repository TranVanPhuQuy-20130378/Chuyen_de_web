package com.example.back_end.services;

import com.example.back_end.models.entities.Banner;
import com.example.back_end.repos.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BannerService {

    @Autowired
    private BannerRepository bannerRepository;

    // Phương thức để lấy tất cả các banner
    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }

    // Phương thức để lấy một banner theo ID
    public Optional<Banner> getBannerById(Integer id) {
        return bannerRepository.findById(id);
    }

    // Phương thức để lưu hoặc cập nhật một banner
    public Banner saveOrUpdateBanner(Banner banner) {
        return bannerRepository.save(banner);
    }

    // Phương thức để xóa một banner
    public void deleteBanner(Integer id) {
        bannerRepository.deleteById(id);
    }
}

