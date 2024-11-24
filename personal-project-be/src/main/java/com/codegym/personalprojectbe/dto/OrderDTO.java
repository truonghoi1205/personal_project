package com.codegym.personalprojectbe.dto;

import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private String orderCode;
    private String status;
    private String paymentStatus;
    private Date orderDate;
    private Double totalPrice;
    private Long customerId;
    private List<OrderItemDTO> orderItems;
//    private List<NotificationSimpleDTO> notifications;
}
