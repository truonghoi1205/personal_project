package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.model.Account;
import com.codegym.personalprojectbe.model.Customer;

public interface ICustomerService {

    void createCustomerRegister(Account account);

    Customer findByAccountId(Long id);
}
