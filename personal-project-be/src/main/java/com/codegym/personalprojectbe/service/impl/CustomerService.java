package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.model.Account;
import com.codegym.personalprojectbe.model.Customer;
import com.codegym.personalprojectbe.repository.ICustomerRepository;
import com.codegym.personalprojectbe.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CustomerService implements ICustomerService {

    @Autowired
    private ICustomerRepository customerRepository;

    @Override
    public Customer createCustomerRegister(Account account) {
        Customer customer = new Customer();
        customer.setAccount(account);
        customer.setName(account.getName());
        customer.setEmail(account.getEmail());
        customer.setPhone(null);
        customer.setEnable(true);
        customer.setGender(null);
        customer.setDob(null);
        customer.setAvatar(null);
        return customerRepository.save(customer);
    }

    @Override
    public Customer findByAccountId(Long id) {
        return customerRepository.findCustomerByAccount_Id(id);
    }


}
