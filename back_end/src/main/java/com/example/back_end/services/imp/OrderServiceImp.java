package com.example.back_end.services.imp;

import com.example.back_end.models.OrderRequest;
import com.example.back_end.models.entities.Order;
import com.example.back_end.models.entities.User;
import com.example.back_end.repos.OrderRepository;
import com.example.back_end.repos.UserRepository;
import com.example.back_end.services.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public Order addOrder(OrderRequest orderRequest) {
        Order order = new Order();
        Optional<User> userOptional = userRepository.findByEmail(orderRequest.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            order.setUser(user);
            order.setAddresss(userOptional.get().getAddress());
        }
            order.setOrderDate(LocalDate.now());
            order.setTotalAmount(orderRequest.getTotal_price());
            return orderRepository.save(order);

    }

    public List<Order> getOrdersByUserId(Integer userId) {
        return orderRepository.findByUserId(userId);
    }
    public Order getOrderByUserIdAndOrderId(Integer userId, Integer orderId) {
        Optional<Order> orderOptional = orderRepository.findById(Long.valueOf(orderId));
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            if (order.getUser() != null && order.getUser().getId().equals(userId)) {
                return order;
            }
        }
        return null;
    }
    public List<Order> getOrdersByEmail(String email) {
        return orderRepository.findByUserEmail(email);
    }
}
