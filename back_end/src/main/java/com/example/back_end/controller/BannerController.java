package com.example.back_end.controller;

import com.example.back_end.models.entities.Banner;
import com.example.back_end.services.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/banners")
public class BannerController {

    @Autowired
    private BannerService bannerService;

    // API để lấy tất cả các banner
    @GetMapping
    public List<Banner> getAllBanners() {
        return bannerService.getAllBanners();
    }

    // API để lấy một banner theo ID
    @GetMapping("/{id}")
    public Optional<Banner> getBannerById(@PathVariable Integer id) {
        return bannerService.getBannerById(id);
    }

    // API để lưu hoặc cập nhật một banner
    @PostMapping
    public Banner saveOrUpdateBanner(@RequestBody Banner banner) {
        return bannerService.saveOrUpdateBanner(banner);
    }

    // API để xóa một banner
    @DeleteMapping("/{id}")
    public void deleteBanner(@PathVariable Integer id) {
        bannerService.deleteBanner(id);
    }
}
