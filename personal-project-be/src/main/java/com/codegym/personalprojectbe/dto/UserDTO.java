package com.codegym.personalprojectbe.dto;

import com.codegym.personalprojectbe.model.IUser;
import com.codegym.personalprojectbe.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserDTO {
    private Set<Role> roles;
    private IUser user;
}
