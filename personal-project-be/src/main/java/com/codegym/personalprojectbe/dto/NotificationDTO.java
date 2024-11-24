package com.codegym.personalprojectbe.dto;

import com.codegym.personalprojectbe.model.Account;
import com.codegym.personalprojectbe.model.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationDTO {
    private Long id;
    private String message;

    private Date createdAt;
    private Boolean isRead;
    private Order order;
    private Account account;
}
