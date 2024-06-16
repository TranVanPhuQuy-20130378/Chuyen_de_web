package com.example.back_end.repos;

import com.example.back_end.models.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Integer userId);

    List<Order> findByUserEmail(String email);
}
