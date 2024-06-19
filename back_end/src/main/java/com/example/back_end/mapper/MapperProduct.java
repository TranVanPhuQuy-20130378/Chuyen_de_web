package com.example.back_end.mapper;

import com.example.back_end.dto.ImageDTO;
import com.example.back_end.dto.ProductDTO;
import com.example.back_end.dto.RatingDTO;
import com.example.back_end.dto.RatingsDTO;
import com.example.back_end.models.entities.ImageProduct;
import com.example.back_end.models.entities.Product;
import com.example.back_end.models.entities.Rating;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


public class MapperProduct {
    public static ProductDTO mapperProductToDTO(Product product){
        ProductDTO build = ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .stockQuantity(product.getStockQuantity())
                .status(product.getStatus())
                .price(product.getPrice().toBigInteger().intValue())
                .vendor(product.getVendor().getVendorName())
                .category(product.getCategory().getCategoryName())
                .listImg(mapperImageToDTO(product.getImageProducts()))
                .rating_comment(mapperRatingsToDTO(product.getRating()))
                .rating(mapperRatingToDTO(product.getRating()))
                .liked(product.getLiked())
                .view(product.getView())
                .buy(product.getBuy())
                .build();
        return build;
    }
    public static List<ImageDTO> mapperImageToDTO(Set<ImageProduct> list_image) {
        return list_image.stream()
                .sorted(Comparator.comparing(ImageProduct::getId)) // Sắp xếp theo id
                .map(img -> {
                    return ImageDTO.builder()
                            .id_image(img.getId())
                            .path_image(img.getImageUrl())
                            .build();
                }).collect(Collectors.toList());
    }
    public static RatingsDTO mapperRatingToDTO(Rating rating) {
        String username = rating.getUser() != null ? rating.getUser().getUsername() : "Default Username";
        return RatingsDTO.builder()
                .id(rating.getId())
                .name(username)
                .star(rating.getStar())
                .create_at(LocalDate.from(rating.getCreate_at()))
                .comment(rating.getComment())
                .build();
    }

    public static List<RatingsDTO> mapperRatingsToDTO(Set<Rating> ratings) {
        return ratings.stream()
                .sorted(Comparator.comparing(Rating::getId)) // Sắp xếp theo id
                .map(MapperProduct::mapperRatingToDTO)
                .collect(Collectors.toList());
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

}
