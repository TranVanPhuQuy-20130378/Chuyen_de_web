package com.example.back_end.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
public class OrderRequest {
    private String email;
    private BigDecimal order_value;
    private BigDecimal total_price;
    private Set<OrderDetailRequest> list_order_detail = new HashSet<>();
}
