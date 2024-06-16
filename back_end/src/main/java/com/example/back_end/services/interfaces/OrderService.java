package com.example.back_end.services.interfaces;

import com.example.back_end.models.OrderRequest;
import com.example.back_end.models.entities.Order;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface OrderService {
    @Modifying
    Order addOrder(OrderRequest orderRequest);
    List<Order> getOrdersByEmail(String email);
}
