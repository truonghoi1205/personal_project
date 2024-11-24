package com.codegym.personalprojectbe.model;

public enum PaymentStatus {
    PENDING("Chờ thanh toán"),
    COMPLETED("Thanh toán thành công"),
    FAILED("Thanh toán thất bại"),
    REFUNDED("Đã hoàn tiền");

    private final String description;

    PaymentStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
