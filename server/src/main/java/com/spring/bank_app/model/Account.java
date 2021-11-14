package com.spring.bank_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import java.util.UUID;

public @Data class Account {
    private Long id;
    private String number;
    private Currency currency;
    private Double balance;
    @JsonIgnore
    private Customer customer;

    public Account(Customer customer, Currency currency ) {
        this.currency = currency;
        this.customer = customer;
        this.number = UUID.randomUUID().toString();
        this.balance = 0.0;
    }
}