package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.dto.GetNumberOfRole;
import com.codegym.personalprojectbe.model.Role;
import com.codegym.personalprojectbe.repository.IRoleRepository;
import com.codegym.personalprojectbe.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository roleRepository;

    public RoleService(IRoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public Iterable<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }

    @Override
    public Iterable<GetNumberOfRole> getAllNumberOfRole() {
        return roleRepository.getAllNumberOfRole();
    }
}
