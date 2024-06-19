package com.example.back_end.services;

import com.example.back_end.dto.ImageProductDTO_Ver1;
import com.example.back_end.dto.ProductDTO_Ver1;
import com.example.back_end.dto.RatingDTO;
import com.example.back_end.models.entities.ImageProduct;
import com.example.back_end.models.entities.Product;
import com.example.back_end.models.entities.Rating;
import com.example.back_end.services.interfaces.ICountProductService;
import com.example.back_end.services.interfaces.IGetProductService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import jakarta.persistence.TypedQuery;



import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductService implements IGetProductService, ICountProductService {
    @PersistenceContext
    private EntityManager _entityManager;


//    public ProductService(EntityManager entityManager) {
//        this._entityManager = entityManager;
//    }

    /**
     * Phương thức chuyển đổi từ List<ImageProduct> sang List<ImageProductDTO_Ver1>
     */
    private List<ImageProductDTO_Ver1> convertImageProductToDTO(Set<ImageProduct> imageProducts) {
        return imageProducts.stream()
                .map(img -> new ImageProductDTO_Ver1(img.getId(), img.getImageUrl()))
                .collect(Collectors.toList());
    }

    /**
     * Lấy ra danh sách sản phẩm theo loại và trạng thái
     * VD:
     * + Lấy ra danh sách áo đá banh đang có trạng thái MỚI
     * + Lấy ra danh sách áo đá banh đang có trạng thái HOT
     */
    @Override
    @Transactional
    public List<ProductDTO_Ver1> getListProductByTypeAndStatus(int type_product, int status_product, int page, int page_size) {

        String jpql = "SELECT DISTINCT p FROM Product p " +
                "WHERE p.category.id = :idTypeProduct " +
                "AND p.status = :idStatusProduct";

        TypedQuery<Product> query = _entityManager.createQuery(jpql, Product.class);
        query.setParameter("idTypeProduct", type_product);
        query.setParameter("idStatusProduct", status_product);

        // Phân trang kết quả trả về
        query.setFirstResult((page - 1) * page_size);
        query.setMaxResults(page_size);

        List<Product> productList = query.getResultList();

        if (productList == null || productList.isEmpty()) return null;

        // convert thành DTO dùng StreamAPI trong Java 8
        return productList.stream().map(product -> {

            ProductDTO_Ver1 productDTO = ProductDTO_Ver1.builder()
                    .id_product(product.getId())
                    .rating(mapperRatingToDTO(product.getRating()))
                    .name_product(product.getName())
                    .listed_price(product.getPrice())
                    .list_image(convertImageProductToDTO(product.getImageProducts())) // Gọi phương thức chuyển đổi thành DTO
                    .id_status_product(product.getStatus())
                    .build();

            return productDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO_Ver1> getListProductBy_TypeAndBrandAndSex(int type_product, int brand, int sex, int page, int page_size) {
        return null;
    }

    /**
     * Đếm số lượng sản phẩm theo loại và trạng thái
     * <p>
     * VD:
     * + Đếm số lượng sản phẩm áo đá banh có trạng thái MỚI
     * + Đếm số lượng áo đá banh có trạng thái HOT
     */
    @Override
    public int countProductsBy_TypeAndStatus(int type_product, int status_product) {
        String jpql = "SELECT COUNT(p) FROM Product p " +
                "WHERE p.category.id = :idTypeProduct " +
                "AND p.status = :idStatusProduct";

        Query query = _entityManager.createQuery(jpql)
                .setParameter("idTypeProduct", type_product)
                .setParameter("idStatusProduct", status_product);

        return ((Number) query.getSingleResult()).intValue();
    }

    /**
     * Lấy ra danh sách sản phẩm theo loại,thương hiệu và giới tính
     * <p>
     * VD:
     * + Lấy ra danh sách áo đá banh của hãng Nike dành cho Nam
     * + Lấy ra danh sách áo đá banh của hãng Adidas dành cho Nữ
     *
     * @param type_product : loại sản phẩm
     * @param brand        : thương hiệu
     */
    @Override
    public List<ProductDTO_Ver1> getListProductBy_TypeAndBrandAndSex(int type_product, int brand, int page, int page_size) {

        String jpql = "SELECT DISTINCT p FROM Product p " +
                "WHERE p.category.id = :idTypeProduct " +
                "AND p.vendor.id = :idBrandProduct ";

        TypedQuery<Product> query = _entityManager.createQuery(jpql, Product.class);
        query.setParameter("idTypeProduct", type_product);
        query.setParameter("idBrandProduct", (long) brand); //=> cần phải ép kiểu về long tại idBrand trong entity Brand là long


        // Phân trang kết quả trả về
        query.setFirstResult((page - 1) * page_size);
        query.setMaxResults(page_size);

        List<Product> productList = query.getResultList();

        if (productList == null || productList.isEmpty()) return null;

        // convert thành DTO dùng StreamAPI trong Java 8
        return productList.stream().map(product -> {

            ProductDTO_Ver1 productDTO = ProductDTO_Ver1.builder()
                    .id_product(product.getId())
                    .name_product(product.getName())
                    .listed_price(product.getPrice())
                    .promotional_price(product.getPrice())
                    .list_image(convertImageProductToDTO(product.getImageProducts())) // Gọi phương thức chuyển đổi thành DTO
                    .id_status_product(product.getStatus())
                    .build();

            return productDTO;
        }).collect(Collectors.toList());
    }

    /**
     * Đếm số lượng sản phẩm theo loại,thương hiệu và giới tính
     * <p>
     * VD:
     * + Đếm số lượng sản phẩm áo đá banh của hãng Nike dành cho Nam
     * + Đếm số lượng sản phẩm áo đá banh của hãng Adidas dành cho Nữ
     *
     * @param type_product : loại sản phẩm
     * @param brand        : thương hiệu
     */
    @Override
    public int countProductsBy_TypeAndBrandAndSex(int type_product, int brand) {
        String jpql = "SELECT COUNT(p) FROM Product p " +
                "WHERE p.category.id = :idTypeProduct " +
                "AND p.vendor.id = :idBrandProduct " ;

        Query query = _entityManager.createQuery(jpql)
                .setParameter("idTypeProduct", type_product)
                .setParameter("idBrandProduct", (long) brand); //=> cần phải ép kiểu về long tại idBrand trong entity Brand là long


        return ((Number) query.getSingleResult()).intValue();

    }

    @Override
    public int countProductsByTypeAndStatus(int type_product, int status_product) {
        return 0;
    }

    @Override
    public int countProductsBy_TypeAndBrandAndSex(int type_product, int brand, int sex) {
        return 0;
    }

    public static RatingDTO mapperRatingToDTO(Set<Rating> ratings) {
        int fiveStar = 0;
        int fourStar = 0;
        int threeStar = 0;
        int twoStar = 0;
        int oneStar = 0;
        int zeroStar = 0;

        for (Rating rating : ratings) {
            switch (rating.getStar()) {
                case 5:
                    fiveStar++;
                    break;
                case 4:
                    fourStar++;
                    break;
                case 3:
                    threeStar++;
                    break;
                case 2:
                    twoStar++;
                    break;
                case 1:
                    oneStar++;
                    break;
                case 0:
                    zeroStar++;
                    break;
            }
        }

        RatingDTO ratingDTO = new RatingDTO();
        ratingDTO.setFive_star(fiveStar);
        ratingDTO.setFour_star(fourStar);
        ratingDTO.setThree_star(threeStar);
        ratingDTO.setTwo_star(twoStar);
        ratingDTO.setOne_star(oneStar);
        ratingDTO.setZero_star(zeroStar);

        return ratingDTO;
    }
    @Transactional
    public void decrementStockQuantityById(Long productId, int buyed) {
        // Find the product by its ID
        Product product = _entityManager.find(Product.class, productId);

        // Check if product is found
        if (product != null) {
            // Decrement the stock quantity
            int currentStock = product.getStockQuantity();
            if (currentStock > 0) {
                product.setStockQuantity(currentStock - buyed);
            } else {
                throw new IllegalStateException("Stock quantity is already zero.");
            }

            // Persist the changes
            _entityManager.merge(product);
        } else {
            throw new IllegalArgumentException("Product with ID " + productId + " not found.");
        }
    }

}
