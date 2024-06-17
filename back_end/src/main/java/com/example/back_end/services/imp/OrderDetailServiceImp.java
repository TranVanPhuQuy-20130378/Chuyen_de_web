package com.example.back_end.services.imp;

import com.example.back_end.models.OrderDetailRequest;
import com.example.back_end.models.entities.Order;
import com.example.back_end.models.entities.OrderDetail;
import com.example.back_end.repos.OrderDetailRepository;
import com.example.back_end.models.entities.Product;
import com.example.back_end.repos.ProductRepository;
import com.example.back_end.services.interfaces.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailServiceImp implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public OrderDetail addOrderDetail(OrderDetailRequest orderDetailRequest, Order order) {
        OrderDetail orderDetail = new OrderDetail();

        // Tìm kiếm sản phẩm dựa trên ID
        Optional<Product> productOptional = productRepository.findById(orderDetailRequest.getId_product());

        // Kiểm tra xem sản phẩm có tồn tại hay không
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            // Thiết lập thông tin sản phẩm cho chi tiết đơn hàng
            orderDetail.setProduct_id(orderDetailRequest.getId_product()); // Lưu ID của sản phẩm
            orderDetail.setProductName(product.getName());
            orderDetail.setQuantity(orderDetailRequest.getQuantity());
            orderDetail.setUnitPrice(product.getPrice());
            orderDetail.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(orderDetailRequest.getQuantity())));
            orderDetail.setOrder(order);
            System.out.println(orderDetail.toString());
            return orderDetailRepository.save(orderDetail);
        } else {
            throw new RuntimeException("Product with id " + orderDetailRequest.getId_product() + " not found");
        }
    }

    @Override
    public List<OrderDetail> getOrderDetailsByOrderId(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }
}
