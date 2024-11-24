package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.dto.OrderDTO;
import com.codegym.personalprojectbe.model.*;
import com.codegym.personalprojectbe.repository.*;
import com.codegym.personalprojectbe.service.IPaymentService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService implements IPaymentService {

    private final ICartRepository cartRepository;
    private final IOrderRepository orderRepository;
    private final IPaymentRepository paymentRepository;
    private final IProductDetailRepository productDetailRepository;
    private final ICartItemRepository cartItemRepository;
    private final OrderConfirmationEmailService orderConfirmationEmailService;

    @Override
    @Transactional
    public Order placeOrder(OrderDTO orderDTO) throws MessagingException {
        Cart cart = cartRepository.findCartByCustomer_Id(orderDTO.getCustomerId());
        if (cart == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Giỏ hàng của bạn đang trống hoặc không tồn tại.");
        }
        Order order = createOrder(cart);

        Payment payment = new Payment();
        Date currentDate = Date.valueOf(LocalDate.now());
        payment.setPaymentDate(currentDate);
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setOrder(order);
        payment.setAmount(order.getTotalPrice());
//        payment.setPaymentMethod();
        paymentRepository.save(payment);

        updateProductQuantities(cart.getItems());
        for (CartItem cartItem : cart.getItems()) {
            cartItemRepository.delete(cartItem);
        }
        cart.getItems().clear();
        cartRepository.save(cart);

        String returnStore = "http://localhost:3000/";
        orderConfirmationEmailService.sendOrderConfirmationEmail(order.getCustomer().getEmail(), order, order.getOrderItems(),payment, returnStore);
        return order;
    }

    private void updateProductQuantities(List<CartItem> cartItems) {
        for (CartItem cartItem : cartItems) {
            ProductDetail productDetail = productDetailRepository.findById(cartItem.getProductDetail().getId())
                    .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại."));

            // Kiểm tra xem số lượng tồn kho có đủ không
            if (productDetail.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Không đủ số lượng sản phẩm: " + productDetail.getProduct().getName());
            }
            // Giảm số lượng tồn kho
            productDetail.setStock(productDetail.getStock() - cartItem.getQuantity());
            productDetailRepository.save(productDetail);
        }
    }


    private Order createOrder(Cart cart) {
        Order order = new Order();
        Random random = new Random();
        int randomNumber = 100000 + random.nextInt(900000);
        String orderCode = "#" + randomNumber;
        order.setOrderCode(orderCode);
        Date currentDate = Date.valueOf(LocalDate.now());
        order.setOrderDate(currentDate);
        order.setStatus(OrderStatus.PENDING);
        order.setCustomer(cart.getCustomer());

        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setProductDetail(cartItem.getProductDetail());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProductDetail().getPrice());
            orderItem.setOrder(order);
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);
        order.setTotalPrice(calculateTotalPrice(orderItems));

        return orderRepository.save(order);
    }

    private double calculateTotalPrice(List<OrderItem> orderItems) {
        return orderItems.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }
}

