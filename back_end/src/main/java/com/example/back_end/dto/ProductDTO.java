package com.example.back_end.dto;


import com.example.back_end.models.entities.Category;
import com.example.back_end.models.entities.Vendor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class ProductDTO {
private long product_id;
    private Integer id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuanlity;
    private Category category;
    private Vendor vendor;
    private Integer imgId;
    private Integer status;
}
