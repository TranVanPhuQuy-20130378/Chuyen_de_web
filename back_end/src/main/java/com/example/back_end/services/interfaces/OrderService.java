package com.example.back_end.services.interfaces;

import com.example.back_end.models.OrderRequest;
import com.example.back_end.models.entities.Order;
import org.springframework.data.jpa.repository.Modifying;

public interface OrderService {
    @Modifying
    Order addOrder(OrderRequest orderRequest);
}
