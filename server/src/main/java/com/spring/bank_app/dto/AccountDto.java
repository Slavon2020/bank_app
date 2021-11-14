package com.spring.bank_app.dto;

import com.spring.bank_app.model.Currency;

public class AccountDto {
    private Currency currency;
    private Long customerId;
    private Long balance;
    private String number;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getBalance() {
        return balance;
    }

    public void setSum(Long balance) {
        this.balance = balance;
    }
}
