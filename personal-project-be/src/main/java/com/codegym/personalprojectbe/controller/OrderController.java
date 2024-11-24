package com.codegym.personalprojectbe.controller;

import com.codegym.personalprojectbe.dto.OrderDTO;
import com.codegym.personalprojectbe.model.Order;
import com.codegym.personalprojectbe.service.INotificationService;
import com.codegym.personalprojectbe.service.IOrderService;
import com.codegym.personalprojectbe.service.IPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService orderService;
    private final IPaymentService paymentService;
    private final INotificationService notificationService;


    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody OrderDTO orderDTO) {
        try {
            Order order = paymentService.placeOrder(orderDTO);
            orderDTO.setId(order.getId());
            notificationService.addNotification(orderDTO);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Đặt hàng thất bại: " + e.getMessage());
        }
    }

}
