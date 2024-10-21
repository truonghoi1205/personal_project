package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.model.Account;
import com.codegym.personalprojectbe.model.Customer;

public interface ICustomerService {

    Customer createCustomerRegister(Account account);

    Customer findByAccountId(Long id);

}
