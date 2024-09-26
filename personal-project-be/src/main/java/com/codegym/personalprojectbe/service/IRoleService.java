package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.dto.GetNumberOfRole;
import com.codegym.personalprojectbe.model.Role;

import java.util.Optional;

public interface IRoleService {
    Iterable<GetNumberOfRole> getAllNumberOfRole();
    Role findByName(String name);
    Iterable<Role> getAllRoles();
    Optional<Role> findById(Long id);

}
