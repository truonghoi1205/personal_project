package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomerRepository extends JpaRepository<Customer,Long> {
    Customer findCustomerByAccount_Id(Long id);

}
