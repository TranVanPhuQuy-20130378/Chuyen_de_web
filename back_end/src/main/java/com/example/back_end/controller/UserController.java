package com.example.back_end.controller;

import com.example.back_end.dto.UserDto;
import com.example.back_end.models.entities.Order;
import com.example.back_end.services.UserService;
import com.example.back_end.services.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;

    @GetMapping("/users/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable("email") String email) {
        UserDto userDto = userService.getUserDtoByEmail(email);
        if (userDto != null) {
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Trả về HTTP 404 nếu không tìm thấy người dùng
        }
    }
    @GetMapping("/users/{iduser}/order")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable("iduser") Integer userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);
        if (orders != null && !orders.isEmpty()) {
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/users/{iduser}/order/{idorder}")
    public ResponseEntity<Order> getOrderByUserIdAndOrderId(@PathVariable("iduser") Integer userId, @PathVariable("idorder") Integer orderId) {
        Order order = orderService.getOrderByUserIdAndOrderId(userId, orderId);
        if (order != null) {
            return new ResponseEntity<>(order, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable("id") Integer userId) {
        try {
            userService.deleteUserById(userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
