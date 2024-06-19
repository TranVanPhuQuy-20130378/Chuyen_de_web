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
        private Integer stockQuantity;
        private String category;
        private String vendor;
        private List<ImageDTO> listImg;
        private Integer status;
        private List<RatingsDTO> rating_comment;
        private Integer view;
        private Integer liked;
        private Integer buy;
        private RatingDTO rating;

        public ProductDTO() {
        }
        public ProductDTO(Integer id, String name, String description, int price, Integer stockQuantity, String category, String vendor, List<ImageDTO> listImg, Integer status, List<RatingsDTO> rating_comment, Integer view, Integer liked, Integer buy, RatingDTO rating) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.price = price;
            this.stockQuantity = stockQuantity;
            this.category = category;
            this.vendor = vendor;
            this.listImg = listImg;
            this.rating_comment = rating_comment;
            this.view = view;
            this.liked = liked;
            this.buy = buy;
            this.rating = rating;
            this.status = status;
        }
    }
