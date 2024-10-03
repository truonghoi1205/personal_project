package com.codegym.personalprojectbe.dto;

import com.codegym.personalprojectbe.model.Role;
import lombok.Data;

import java.sql.Date;
import java.util.Set;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private Date dob;
    private String gender;
    private String phone;
    private Set<Role> roles;
}
