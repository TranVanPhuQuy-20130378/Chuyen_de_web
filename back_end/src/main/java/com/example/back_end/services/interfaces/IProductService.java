package com.example.back_end.services.interfaces;

import com.example.back_end.dto.ProductDTO;

import java.util.List;

import com.example.back_end.models.entities.Product;
import org.springframework.data.domain.Pageable;
public interface IProductService {

    ProductDTO findById(long id);
    List<ProductDTO> findByNameProduct(String name, Pageable pageable);
    List<ProductDTO> findAll(Pageable pageable);
    List<ProductDTO> findProductByBrandWithOptionSort(String name,Pageable pageable);
    List<ProductDTO> findByTypeProduct_IdOrCate_Id(Integer idType, Long idCate,Pageable pageable);

    List<ProductDTO> findByCate_Id(Long idCate, Pageable pageable);
    List<ProductDTO> findByTypeProduct_Id(Integer idType, Pageable pageable);
    List<ProductDTO> findByTypeProduct_IdAndCate_Id(Integer idType, Long idCate, Pageable pageable);
    List<ProductDTO> getProductsByVendor(Integer vendorId);
}
