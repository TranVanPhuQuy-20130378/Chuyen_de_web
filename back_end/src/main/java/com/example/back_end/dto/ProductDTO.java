package com.example.back_end.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@Builder
public class ProductDTO {
    private Integer id;
    private String name;
    private String description;
    private int price;
    private Integer stockQuanlity;
    private String category;
    private String vendor;
    private List<ImageDTO> listImg;
    private Integer status;
    private List<RatingsDTO> rating_comment;
    private Integer view;
    private Integer liked;
    private Integer buy;
    private RatingDTO rating;

}
