package com.spring.bank_app.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

public @Data class Customer {
    private Long id;
    private String name;
    private String email;
    private Integer age;
    private List<Account> accounts;

    public Customer(Integer age, String email, String name) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.accounts = new ArrayList<>();
    }

    public void addAccount(Account account) {
        this.accounts.add(account);
    }
    public void deleteAccount(Account account) {
        this.accounts.remove(account);
    }
}