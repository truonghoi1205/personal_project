package com.codegym.personalprojectbe.model;

public enum OrderStatus {
    PENDING("Chờ xử lý"),
    CONFIRMED("Đặt hàng thành công"),
    SHIPPED("Đã giao"),
    DELIVERED("Đã nhận hàng"),
    CANCELED("Đã hủy");

    private final String description;

    OrderStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}