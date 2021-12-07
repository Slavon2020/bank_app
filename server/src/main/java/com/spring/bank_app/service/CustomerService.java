package com.spring.bank_app.service;

import com.spring.bank_app.dao.CustomerDaoImpl;
import com.spring.bank_app.dto.CustomerDto;
import com.spring.bank_app.dto.CustomerEmployerDto;
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

    public boolean deleteCustomer(long id) {
        return customerDaoImpl.deleteById(id);
    }

    public boolean deleteCustomer(Customer customer) {

        return customerDaoImpl.delete(customer);
    }

    public void deleteCustomerAccount(Customer customer) {}

    public void addCustomerEmployer(CustomerEmployerDto customerEmployerDto) {
       customerDaoImpl.addCustomerEmployer(customerEmployerDto);
    }
}
