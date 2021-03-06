package com.spring.bank_app.service;

import com.spring.bank_app.dao.CustomerDaoImpl;
import com.spring.bank_app.dto.CustomerDto.CustomerDto;
import com.spring.bank_app.dto.CustomerEmployerDto;
import com.spring.bank_app.model.Customer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Transactional
public class CustomerService {
    private final CustomerDaoImpl customerDaoImpl;

    public CustomerService(CustomerDaoImpl customerDaoImpl) {
        this.customerDaoImpl = customerDaoImpl;
    }

    public Customer getCustomerInfo(Long id) {
        return this.customerDaoImpl.getById(id);
    }
    public Set<Customer> getAllCustomersInfo() {
        return this.customerDaoImpl.findAll();
    }

    public Customer createCustomer(Customer customer) {

        return this.customerDaoImpl.save(customer);
    }


    public Customer updateCustomer(CustomerDto customerDto) {
        return customerDaoImpl.update(customerDto);
    }

    @Transactional
    public boolean deleteCustomer(Long id) {
        return customerDaoImpl.deleteById(id);
    }

    public boolean deleteCustomer(Customer customer) {

        return customerDaoImpl.delete(customer);
    }

    public void deleteCustomerAccount(Customer customer) {}

    public void addCustomerEmployer(CustomerEmployerDto customerEmployerDto) {
       customerDaoImpl.addEmployer(customerEmployerDto);
    }
}
