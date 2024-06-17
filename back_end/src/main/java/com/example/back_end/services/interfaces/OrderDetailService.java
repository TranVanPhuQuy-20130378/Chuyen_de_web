package com.example.back_end.services.interfaces;

import com.example.back_end.models.OrderDetailRequest;
import com.example.back_end.models.entities.Order;
import com.example.back_end.models.entities.OrderDetail;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface OrderDetailService {
    @Modifying
    OrderDetail addOrderDetail(OrderDetailRequest orderDetailRequest, Order order);
    List<OrderDetail> getOrderDetailsByOrderId(Long orderId);
}
