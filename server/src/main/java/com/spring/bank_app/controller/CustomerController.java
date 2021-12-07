package com.spring.bank_app.controller;

import com.spring.bank_app.dto.CustomerDto;
import com.spring.bank_app.dto.CustomerEmployerDto;
import com.spring.bank_app.model.Customer;
import com.spring.bank_app.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {
    private final CustomerService customerService;
    private Long id;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/{id}")
    public Customer getCustomerInfo(@PathVariable("id") Long id) {
        this.id = id;
        return this.customerService.getCustomerInfo(id);
    }

    @GetMapping
    public List<Customer> getAllCustomersInfo() {
        return this.customerService.getAllCustomersInfo();
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return this.customerService.createCustomer(customer);
    }
    @PutMapping
    public Customer updateCustomer(@RequestBody CustomerDto customerDto) {
        return customerService.updateCustomer(customerDto);
    }

    @DeleteMapping
    public Map<String, Boolean> delete(@RequestParam(value = "id") Long id) {

        if (this.customerService.deleteCustomer(id)) {
            return Collections.singletonMap("deleted", true);
        }
        return Collections.singletonMap("deleted", false);
    }

    @PutMapping("/employers")
    public void addCustomerEmployer(@RequestBody CustomerEmployerDto customerEmployerDto) {
        customerService.addCustomerEmployer(customerEmployerDto);
    }
}