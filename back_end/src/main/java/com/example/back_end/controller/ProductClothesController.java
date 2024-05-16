package com.example.back_end.controller;



import com.example.back_end.common.Brand;
import com.example.back_end.common.StatusProduct;
import com.example.back_end.common.TypeProduct;
import com.example.back_end.dto.PagedResponse_Ver1;
import com.example.back_end.dto.ProductDTO_Ver1;
import com.example.back_end.filter.PaginationFilter;
import com.example.back_end.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller này dùng để handle các API liên quan đến sản phẩm quần áo
 */
@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductClothesController {
    private final ProductService _productService;

    @Autowired
    public ProductClothesController(ProductService productService) {
        this._productService = productService;
    }

    @GetMapping("/ds-dien-thoai-moi")
    public ResponseEntity<PagedResponse_Ver1<List<ProductDTO_Ver1>>> getListTelephoneNew(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {
        try {
            var validFilter = new PaginationFilter(page, pageSize);

            var data = _productService.getListProductByTypeAndStatus(TypeProduct.ANDROID, StatusProduct.MOI, validFilter.current_page, validFilter.page_size);

            if (data == null || data.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            var total_items = _productService.countProductsByTypeAndStatus(TypeProduct.ANDROID, StatusProduct.MOI);

            return ResponseEntity.ok(new PagedResponse_Ver1<>(data, validFilter.current_page, validFilter.page_size,total_items));
        } catch (Exception e) {
            // Xử lý lỗi và trả về mã trạng thái 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/ds-dien-thoai-hot")
    public ResponseEntity<PagedResponse_Ver1<List<ProductDTO_Ver1>>> getTelephonetHot(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize) {
        try {
            var validFilter = new PaginationFilter(page, pageSize);

            var data = _productService.getListProductByTypeAndStatus(TypeProduct.ANDROID, StatusProduct.HOT, validFilter.current_page, validFilter.page_size);

            if (data == null || data.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            var total_items = _productService.countProductsByTypeAndStatus(TypeProduct.ANDROID, StatusProduct.HOT);

            return ResponseEntity.ok(new PagedResponse_Ver1<>(data, validFilter.current_page, validFilter.page_size, total_items));

        } catch (Exception e) {
            // Xử lý lỗi và trả về mã trạng thái 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/ds-dien-thoai-khuyen-mai")
    public ResponseEntity<PagedResponse_Ver1<List<ProductDTO_Ver1>>> getListTelephonePromotional(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize) {
        try {
            var validFilter = new PaginationFilter(page, pageSize);

            var data = _productService.getListProductByTypeAndStatus(TypeProduct.ANDROID, StatusProduct.KHUYEN_MAI, validFilter.current_page, validFilter.page_size);

            if (data == null || data.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            var total_items = _productService.countProductsByTypeAndStatus(TypeProduct.ANDROID, StatusProduct.KHUYEN_MAI);

            return ResponseEntity.ok(new PagedResponse_Ver1<>(data, validFilter.current_page, validFilter.page_size, total_items));

        } catch (Exception e) {
            // Xử lý lỗi và trả về mã trạng thái 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/ds-dien-thoai-iphone")
    public ResponseEntity<PagedResponse_Ver1<List<ProductDTO_Ver1>>> getListSoccerShirtNikeForMen(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize) {
        try {
            var validFilter = new PaginationFilter(page, pageSize);

            var data = _productService.getListProductBy_TypeAndBrandAndSex(TypeProduct.IOS, Brand.IPHONE, validFilter.current_page, validFilter.page_size);

            if (data == null || data.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            var total_items = _productService.countProductsBy_TypeAndBrandAndSex(TypeProduct.IOS, Brand.IPHONE);

            return ResponseEntity.ok(new PagedResponse_Ver1<>(data, validFilter.current_page, validFilter.page_size, total_items));

        } catch (Exception e) {
            // Xử lý lỗi và trả về mã trạng thái 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/ds-dien-thoai-sam-sung")
    public ResponseEntity<PagedResponse_Ver1<List<ProductDTO_Ver1>>> getListSoccerShirtAdidasForMen(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize) {
        try {
            var validFilter = new PaginationFilter(page, pageSize);

            var data = _productService.getListProductBy_TypeAndBrandAndSex(TypeProduct.ANDROID, Brand.SAMSUNG, validFilter.current_page, validFilter.page_size);

            if (data == null || data.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            var total_items = _productService.countProductsBy_TypeAndBrandAndSex(TypeProduct.ANDROID, Brand.SAMSUNG);

            return ResponseEntity.ok(new PagedResponse_Ver1<>(data, validFilter.current_page, validFilter.page_size, total_items));

        } catch (Exception e) {
            // Xử lý lỗi và trả về mã trạng thái 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/ds-dien-thoai-oppo")
    public ResponseEntity<PagedResponse_Ver1<List<ProductDTO_Ver1>>> getListSoccerShirtPumaForMen(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize) {
        try {
            var validFilter = new PaginationFilter(page, pageSize);

            List<ProductDTO_Ver1> data = _productService.getListProductBy_TypeAndBrandAndSex(TypeProduct.ANDROID, Brand.OPPO, validFilter.current_page, validFilter.page_size);

            if (data == null || data.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            var total_items = _productService.countProductsBy_TypeAndBrandAndSex(TypeProduct.ANDROID, Brand.OPPO);

            return ResponseEntity.ok(new PagedResponse_Ver1<>(data, validFilter.current_page, validFilter.page_size, total_items));

        } catch (Exception e) {
            // Xử lý lỗi và trả về mã trạng thái 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/ds-dien-thoai-xiaomi")
    public ResponseEntity<PagedResponse_Ver1<List<ProductDTO_Ver1>>> getListSoccerNikeForWoMen(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize) {
        try {
            var validFilter = new PaginationFilter(page, pageSize);

            var data = _productService.getListProductBy_TypeAndBrandAndSex(TypeProduct.ANDROID, Brand.XIAOMI, validFilter.current_page, validFilter.page_size);

            if (data == null || data.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            var total_items = _productService.countProductsBy_TypeAndBrandAndSex(TypeProduct.ANDROID, Brand.XIAOMI);

            return ResponseEntity.ok(new PagedResponse_Ver1<>(data, validFilter.current_page, validFilter.page_size, total_items));

        } catch (Exception e) {
            // Xử lý lỗi và trả về mã trạng thái 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/ds-dien-thoai-vivo")
    public ResponseEntity<PagedResponse_Ver1<List<ProductDTO_Ver1>>> getListSoccerAdidasForWoMen(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize) {
        try {
            var validFilter = new PaginationFilter(page, pageSize);

            var data = _productService.getListProductBy_TypeAndBrandAndSex(TypeProduct.ANDROID, Brand.VIVO, validFilter.current_page, validFilter.page_size);

            if (data == null || data.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            var total_items = _productService.countProductsBy_TypeAndBrandAndSex(TypeProduct.ANDROID, Brand.VIVO);

            return ResponseEntity.ok(new PagedResponse_Ver1<>(data, validFilter.current_page, validFilter.page_size, total_items));

        } catch (Exception e) {
            // Xử lý lỗi và trả về mã trạng thái 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/ds-dien-thoai-realme")
    public ResponseEntity<PagedResponse_Ver1<List<ProductDTO_Ver1>>> getListSoccerPumaForWoMen(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize) {
        try {
            var validFilter = new PaginationFilter(page, pageSize);

            var data = _productService.getListProductBy_TypeAndBrandAndSex(TypeProduct.ANDROID, Brand.REALME, validFilter.current_page, validFilter.page_size);

            if (data == null || data.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            var total_items = _productService.countProductsBy_TypeAndBrandAndSex(TypeProduct.ANDROID, Brand.REALME);

            return ResponseEntity.ok(new PagedResponse_Ver1<>(data, validFilter.current_page, validFilter.page_size, total_items));

        } catch (Exception e) {
            // Xử lý lỗi và trả về mã trạng thái 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
