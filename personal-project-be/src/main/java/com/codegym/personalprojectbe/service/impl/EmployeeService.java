package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.model.Employee;
import com.codegym.personalprojectbe.model.IUser;
import com.codegym.personalprojectbe.service.IEmployeeService;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService implements IEmployeeService {
    @Override
    public Employee findByAccountId(Long id) {
        return null;
    }
}
