package com.codegym.personalprojectbe.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PasswordDTO {
    private String currentPassword;

    @NotNull(message = "Nhập mật khẩu mới")
    @Size(min = 6,message = "Mật khẩu tối thiểu 6 ký tự")
    private String newPassword;

    @NotNull(message = "Nhập xác nhận mật khẩu")
    private String reEnterPassword;
}
