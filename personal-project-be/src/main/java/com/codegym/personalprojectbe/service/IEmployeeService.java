package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.model.Employee;

public interface IEmployeeService {
    Employee findByAccountId(Long id);
}
