package com.spring.bank_app.service;

import com.spring.bank_app.dao.CustomerDaoImpl;
import com.spring.bank_app.dto.CustomerDto;
import com.spring.bank_app.model.Currency;
import com.spring.bank_app.model.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private final CustomerDaoImpl customerDaoImpl;

    public CustomerService(CustomerDaoImpl customerDaoImpl) {
        this.customerDaoImpl = customerDaoImpl;
    }

    public Customer getCustomerInfo(Long id) {
        return this.customerDaoImpl.getOne(id);
    }
    public List<Customer> getAllCustomersInfo() {
        return this.customerDaoImpl.findAll();
    }

    public Customer createCustomer(Customer customer) {

        return this.customerDaoImpl.save(customer);
    }


    public Customer updateCustomer(CustomerDto customerDto) {
        return customerDaoImpl.update(customerDto);
    }

    public boolean deleteCustomer(Long id) {
        boolean isDeleted = false;
        Customer customerToDelete = this.customerDaoImpl.getOne(id);
        if (customerToDelete != null) {
            this.customerDaoImpl.delete(customerToDelete);
            isDeleted = true;
        }
        return isDeleted;
    }

    public void createCustomerAccount(Customer customer, Currency currency) {
        System.out.println("create account");
        System.out.println("customer --- " + customer);
        System.out.println("currency --- " + currency);
    }
    public void deleteCustomerAccount(Customer customer) {}
}
