package com.spring.bank_app.dao;

import com.spring.bank_app.dto.CustomerDto;
import com.spring.bank_app.interfaces.Dao;
import com.spring.bank_app.model.Customer;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomerDaoImpl implements Dao<Customer> {
    private List<Customer> customers;
    private static long id = 1;

    CustomerDaoImpl() {
        this.customers = new ArrayList<>();
    }

    @Override
    public Customer save(Customer customer) {
        customer.setId(id++);
        this.customers.add(customer);
        return customer;
    }

    @Override
    public boolean delete(Customer customer) {
        if (this.customers.contains(customer)) {
            this.customers.remove(customer);
            return true;
        }
        return false;
    }

    @Override
    public void deleteAll(List<Customer> customers) {
        this.customers.stream().filter((customer -> !customers.contains(customer)));
    }

    @Override
    public void saveAll(List<Customer> customers) {
        customers.forEach((customer) -> save(customer));
    }

    @Override
    public List<Customer> findAll() {
        return this.customers;
    }

    @Override
    public boolean deleteById(long id) {
        if (this.customers.size() >= id) {
            this.customers.remove((int)id);
            return true;
        }
        return false;
    }

    @Override
    public Customer getOne(long id) {
        Customer toReturn = null;
        for (Customer customer : this.customers) {
            if (customer.getId() == id) {
                toReturn = customer;
            }
        }
        return toReturn;
    }

    public Customer update(CustomerDto customerDto) {
        Customer customer = getOne(customerDto.getId());
        customer.setName(customerDto.getName());
        customer.setEmail(customerDto.getEmail());
        return customer;
    }
}
