package com.example.back_end.mapper;

import com.example.back_end.dto.ImageDTO;
import com.example.back_end.dto.ProductDTO;
import com.example.back_end.models.entities.ImageProduct;
import com.example.back_end.models.entities.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


public class MapperProduct {
    public static ProductDTO mapperProductToDTO(Product product){
        ProductDTO build = ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .vendor(product.getVendor().getVendorName())
                .category(product.getCategory().getCategoryName())
                .listImg(mapperImageToDTO(product.getImageProducts()))
                .list_comment(new ArrayList<>(product.getComments()))
                .build();
        return build;
    }
    public static List<ImageDTO> mapperImageToDTO(Set<ImageProduct> list_image){

        return list_image.stream().map(img->{
            return ImageDTO.builder()
                    .id_image(img.getId())
                    .path_image(img.getImageUrl())
                    .build();
        }).collect(Collectors.toList());

    }


}
