package com.example.back_end.repos;



import com.example.back_end.models.entities.Product;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.vendor.vendorName = :brandName")
    List<Product> findAllByBrand(@Param("brandName") String brandName);
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> findByNameContainingIgnoreCase(@Param("keyword") String keyword, Pageable pageable);

    List<Product> findByCategory_CategoryName(String name,Pageable pageable);
    List<Product> findByVendor_IdOrCategory_Id(Integer idVendor, Long idCate,Pageable pageable);
    List<Product> findByVendor_IdAndCategory_Id(Integer idVendor, Long idCate,Pageable pageable);
    List<Product> findByCategory_Id(Long idCate, Pageable pageable);
    List<Product> findByVendor_Id(Integer idVendor,Pageable pageable);
    List<Product> findByVendor_Id(Integer idVendor);

}