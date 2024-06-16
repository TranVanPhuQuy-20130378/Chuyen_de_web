package com.example.back_end.controller;

import com.example.back_end.models.OrderRequest;
import com.example.back_end.models.ResponseObject;
import com.example.back_end.models.entities.Order;
import com.example.back_end.services.interfaces.OrderDetailService;
import com.example.back_end.services.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderDetailService orderDetailService;
    @Transactional
    @PostMapping("/create-order")
    public ResponseEntity<ResponseObject> create(@RequestBody @Valid OrderRequest orderRequest) {
        Order order = orderService.addOrder(orderRequest);


        orderRequest.getList_order_detail().stream().forEach(o -> {
            orderDetailService.addOrderDetail(o, order);
        });
        return Optional.of(ResponseEntity.ok().body(
                new ResponseObject(
                        HttpStatus.OK.name(),
                        HttpStatus.OK.getReasonPhrase(),
                        orderRequest
                )
        )).get();
    }
    @GetMapping("/{email}")
    public ResponseEntity<List<Order>> getOrdersByEmail(@PathVariable(name="email") String email) {
        List<Order> orders = orderService.getOrdersByEmail(email);
        return ResponseEntity.ok().body(orders);
    }
}
