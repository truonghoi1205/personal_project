package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.repository.IOrderRepository;
import com.codegym.personalprojectbe.service.IOrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OrderService implements IOrderService {

    private final IOrderRepository orderRepository;


}
