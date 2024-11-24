package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.dto.NotificationDTO;
import com.codegym.personalprojectbe.dto.OrderDTO;
import com.codegym.personalprojectbe.model.Customer;
import com.codegym.personalprojectbe.model.Notification;
import com.codegym.personalprojectbe.model.Order;
import com.codegym.personalprojectbe.repository.ICustomerRepository;
import com.codegym.personalprojectbe.repository.INotificationRepository;
import com.codegym.personalprojectbe.repository.IOrderRepository;
import com.codegym.personalprojectbe.service.INotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class NotificationService implements INotificationService {

    private final INotificationRepository notificationRepository;
    private final ICustomerRepository customerRepository;
    private final IOrderRepository orderRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void addNotification(OrderDTO orderDTO) {
        try {
            Customer customer = customerRepository.findById(orderDTO.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản người dùng"));
            Order order = orderRepository.findById(orderDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

            NotificationDTO notificationDTO = NotificationDTO.builder()
                    .message(customer.getName() + " vừa mới đặt một đơn hàng.")
                    .createdAt(new Date())
                    .isRead(false)
                    .order(order)
                    .build();

            Notification notification = new Notification();
            notification.setId(notificationDTO.getId());
            notification.setMessage(notificationDTO.getMessage());
            notification.setCreatedAt(notificationDTO.getCreatedAt()); // Đây cũng cần phải là Timestamp
            notification.setIsRead(notificationDTO.getIsRead());
            notification.setOrder(order);
            notificationRepository.save(notification);

            String notificationMessage;
            notificationMessage = new ObjectMapper().writeValueAsString(notification);
            messagingTemplate.convertAndSend("/topic/admin-notifications/", notificationMessage);
        } catch (Exception e) {
            e.printStackTrace(); // In ra chi tiết lỗi
            throw new RuntimeException("Lỗi trong quá trình thêm thông báo: " + e.getMessage(), e);
        }
    }


}
