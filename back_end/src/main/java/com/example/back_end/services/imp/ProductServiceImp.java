package com.example.back_end.services.imp;

import com.example.back_end.dto.ProductDTO;
import com.example.back_end.mapper.MapperProduct;
import com.example.back_end.models.entities.Product;
import com.example.back_end.repos.CategoryRepository;
import com.example.back_end.repos.ProductRepository;
import com.example.back_end.repos.VendorRepository;
import com.example.back_end.services.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImp implements IProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private VendorRepository vendorRepository;
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
    public List<ProductDTO> findByNameProduct(String name) {

        return Optional.ofNullable(productRepository.findByNameContainingIgnoreCase(name))
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
    public List<ProductDTO> findAll() {
        return Optional.ofNullable(productRepository.findAll()).orElse(null)
                .stream()
                .map(MapperProduct::mapperProductToDTO)
                .collect(Collectors.toList());
    }


    public List<ProductDTO> findByStatus(int status, Pageable pageable) {
        return Optional.ofNullable(productRepository.findByStatus(status, pageable)).orElse(null)
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

    public List<ProductDTO> getProductsByVendor(Integer vendorId) {
        List<Product> productList = productRepository.findByVendor_Id(vendorId);
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (Product product : productList) {
            productDTOList.add(convertToDTO(product));
        }
        return productDTOList;
    }


    @Override
    public List<ProductDTO> findByVendorNameContaining(String vendorName, Pageable pageable) {
        return Optional.ofNullable(productRepository.findByVendor_VendorNameContainingIgnoreCase(vendorName, pageable))
                .orElse(Collections.emptyList())
                .stream()
                .map(MapperProduct::mapperProductToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> findByVendorNameContaining(String vendorName) {
        return Optional.ofNullable(productRepository.findByVendor_VendorNameContainingIgnoreCase(vendorName))
                .orElse(Collections.emptyList())
                .stream()
                .map(MapperProduct::mapperProductToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO updateById(long id, ProductDTO productDTO) {
        // Tìm kiếm sản phẩm trong cơ sở dữ liệu
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + id));

        // Cập nhật thông tin của sản phẩm từ dữ liệu mới của productDTO
        if (productDTO.getName() != null) {
            existingProduct.setName(productDTO.getName());
        }
        if (productDTO.getDescription() != null) {
            existingProduct.setDescription(productDTO.getDescription());
        }
        if (productDTO.getPrice() != 0) {
            existingProduct.setPrice(BigDecimal.valueOf(productDTO.getPrice()));
        }
        if (productDTO.getStockQuantity() != null) {
            existingProduct.setStockQuantity(productDTO.getStockQuantity());
        }
        if (!productDTO.getCategory().isEmpty()) {

            existingProduct.setCategory(categoryRepository.findByCategoryName(productDTO.getCategory()));
        }
        if (productDTO.getVendor() != null) {

            existingProduct.setVendor(vendorRepository.findByVendorName(productDTO.getVendor()));
        }

        if (productDTO.getStatus() != null) {
            existingProduct.setStatus(productDTO.getStatus());
        }
        if (productDTO.getView() != null) {
            existingProduct.setView(productDTO.getView());
        }
        if (productDTO.getLiked() != null) {
            existingProduct.setLiked(productDTO.getLiked());
        }
        if (productDTO.getBuy() != null) {
            existingProduct.setBuy(productDTO.getBuy());
        }

        // Lưu sản phẩm đã cập nhật vào cơ sở dữ liệu
        Product updatedProduct = productRepository.save(existingProduct);

        // Trả về DTO của sản phẩm đã được cập nhật
        return MapperProduct.mapperProductToDTO(updatedProduct);
    }



    private ProductDTO convertToDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice().intValue());
        productDTO.setStockQuantity(product.getStockQuantity());
        productDTO.setCategory(product.getCategory().getCategoryName()); // Lấy tên danh mục
        productDTO.setVendor(product.getVendor().getVendorName()); // Lấy tên nhà cung cấp
        // Các bước khác để thiết lập các trường khác của ProductDTO
        return productDTO;
    }
}
