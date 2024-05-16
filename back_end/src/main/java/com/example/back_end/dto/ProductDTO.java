package com.example.back_end.dto;


import com.example.back_end.models.entities.Category;
import com.example.back_end.models.entities.Commentp;
import com.example.back_end.models.entities.Vendor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;


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
    private  String category;
    private String vendor;
    private List<ImageDTO> listImg;
    private Integer status;
    private List<Commentp> list_comment;
}
