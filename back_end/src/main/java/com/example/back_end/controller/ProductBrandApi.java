package com.example.back_end.controller;

import com.example.back_end.models.ResponseObject;
import com.example.back_end.repos.ProductRepository;
import com.example.back_end.repos.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/phone")
public class ProductBrandApi {
    @Autowired
    ProductRepository product;
    @GetMapping("/ds-dien-thoai-samsung")
    public ResponseObject getListSamsung() {
        return new ResponseObject("OK", "Danh điện thoại Samsung", product.findAllByBrand("Samsung"));
    }
    @GetMapping("/ds-dien-thoai-iphone")
    public ResponseObject getListIphone() {
        return new ResponseObject("OK", "Danh sách điện thoại Iphone", product.findAllByBrand("IPhone"));
    }
    @GetMapping("/ds-dien-thoai-oppo")
    public ResponseObject getListOppo() {
        return new ResponseObject("OK", "Danh sách điện thoại OPPO", product.findAllByBrand("OPPO"));
    }
    @GetMapping("/ds-dien-thoai-xiaomi")
    public ResponseObject getListXiaomi() {
        return new ResponseObject("OK", "Danh sách điện thoại Xiaomi", product.findAllByBrand("Xiaomi"));
    }
    @GetMapping("/ds-dien-thoai-vivo")
    public ResponseObject getListVivo() {
        return new ResponseObject("OK", "Danh sách điện thoại Vivo", product.findAllByBrand("Vivo"));
    }
    @GetMapping("/ds-dien-thoai-realme")
    public ResponseObject getListRealme() {
        return new ResponseObject("OK", "Danh sách điện thoại Realme", product.findAllByBrand("Realme"));
    }
}
