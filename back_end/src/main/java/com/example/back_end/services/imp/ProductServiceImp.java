package com.example.back_end.services.imp;

import com.example.back_end.dto.ProductDTO;
import com.example.back_end.mapper.MapperProduct;
import com.example.back_end.models.entities.Product;
import com.example.back_end.repos.ProductRepository;
import com.example.back_end.services.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImp implements IProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public ProductDTO findById(long id) {
        return Optional.ofNullable(productRepository.findById(id)
                        .orElse(null))
                .map(MapperProduct::mapperProductToDTO)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + id));
    }


    @Override
    public List<ProductDTO> findByNameProduct(String name,Pageable pageable) {

        return Optional.ofNullable(productRepository.findByNameContainingIgnoreCase(name,pageable))
                .orElse(Collections.emptyList())
                .stream()
                .map(MapperProduct::mapperProductToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> findAll(Pageable pageable) {
        return Optional.ofNullable(productRepository.findAll(pageable)).orElse(null)
                .stream()
                .map(MapperProduct::mapperProductToDTO)
                .collect(Collectors.toList());

    }


    @Override
    public List<ProductDTO> findProductByBrandWithOptionSort(String name, Pageable pageable) {
        return Optional.of(productRepository.findByCategory_CategoryName(name, pageable))
                .orElse(Collections.emptyList())
                .stream()
                .sorted(Comparator.comparing(Product::getTimeCreate).reversed())
                .map(MapperProduct::mapperProductToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> findByTypeProduct_IdOrCate_Id(Integer idVendor, Long idCate, Pageable pageable) {
        return  Optional.of(productRepository.findByVendor_IdOrCategory_Id(idVendor, idCate, pageable))
                .orElse(Collections.emptyList())
                .stream()
                .sorted(Comparator.comparing(Product::getTimeCreate).reversed())
                .map(MapperProduct::mapperProductToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> findByCate_Id(Long idCate, Pageable pageable) {
        System.out.println("brand and sex");
        return  Optional.of(productRepository.findByCategory_Id(idCate, pageable))
                .orElse(Collections.emptyList())
                .stream()
                .sorted(Comparator.comparing(Product::getTimeCreate).reversed())
                .map(MapperProduct::mapperProductToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> findByTypeProduct_Id(Integer idVendor,  Pageable pageable) {
        System.out.println("type and sex");
        return  Optional.of(productRepository.findByVendor_Id(idVendor, pageable))
                .orElse(Collections.emptyList())
                .stream()
                .sorted(Comparator.comparing(Product::getTimeCreate).reversed())
                .map(MapperProduct::mapperProductToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> findByTypeProduct_IdAndCate_Id(Integer idVendor, Long idCate, Pageable pageable) {
        System.out.println("type and brand");
        return  Optional.of(productRepository.findByVendor_IdAndCategory_Id(idVendor, idCate, pageable))
                .orElse(Collections.emptyList())
                .stream()
                .sorted(Comparator.comparing(Product::getTimeCreate).reversed())
                .map(MapperProduct::mapperProductToDTO)
                .collect(Collectors.toList());
    }
}
