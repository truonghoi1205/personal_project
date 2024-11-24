package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.dto.OrderDTO;
import com.codegym.personalprojectbe.model.Order;
import jakarta.mail.MessagingException;

public interface IPaymentService {
    Order placeOrder(OrderDTO orderDTO) throws MessagingException;
}
