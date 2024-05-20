package com.example.back_end.services.imp;

import com.example.back_end.models.OrderRequest;
import com.example.back_end.models.entities.Order;
import com.example.back_end.models.entities.User;
import com.example.back_end.repos.OrderRepository;
//import com.example.back_end.services.interfaces.OrderDetailService;
import com.example.back_end.repos.UserRepository;
import com.example.back_end.services.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
//    @Autowired
//    private OrderDetailService orderDetailService;
    @Autowired
    private UserRepository userRepository;
    @Override
    public Order addOrder(OrderRequest orderRequest) {
        Order order = new Order();
        Optional<User> userOptional = userRepository.findById(orderRequest.getId_user());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            order.setUser(user);
        }
            order.setOrderDate(LocalDate.now());
            order.setTotalAmount(orderRequest.getTotal_price());
            order.setAddresss(orderRequest.getAddress());
            return orderRepository.save(order);

    }
}
