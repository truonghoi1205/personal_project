package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.model.Account;
import com.codegym.personalprojectbe.model.Customer;
import com.codegym.personalprojectbe.model.IUser;

public interface ICustomerService {

    void createCustomerRegister(Account account);

    Customer findByAccountId(Long id);
}
