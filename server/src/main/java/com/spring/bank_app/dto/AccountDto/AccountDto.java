package com.spring.bank_app.dto.AccountDto;

import com.spring.bank_app.model.Currency;

import java.math.BigDecimal;

public class AccountDto {
    private Currency currency;
    private Long customerId;
    private BigDecimal balance;
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

    public BigDecimal getBalance() {
        return balance;
    }

    public void setSum(BigDecimal balance) {
        this.balance = balance;
    }
}
