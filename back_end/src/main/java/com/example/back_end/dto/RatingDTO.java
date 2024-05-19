package com.example.back_end.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RatingDTO {
    private int five_star;
    private int four_star;
    private int three_star;
    private int two_star;
    private int one_star;
    private int zero_star;
    public RatingDTO() {
        this.five_star = 0;
        this.four_star = 0;
        this.three_star = 0;
        this.two_star = 0;
        this.one_star = 0;
        this.zero_star = 0;
    }
    public RatingDTO(int five_star, int four_star, int three_star, int two_star, int one_star, int zero_star) {
        this.five_star = five_star;
        this.four_star = four_star;
        this.three_star = three_star;
        this.two_star = two_star;
        this.one_star = one_star;
        this.zero_star = zero_star;
    }
}
