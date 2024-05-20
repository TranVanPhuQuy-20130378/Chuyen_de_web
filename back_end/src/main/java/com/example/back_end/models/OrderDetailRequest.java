package com.example.back_end.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
@Builder
public class OrderDetailRequest {
    private Long id_product;

    private Integer quantity;
}
