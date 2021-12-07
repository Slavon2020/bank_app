package com.spring.bank_app.dto.AccountDto;

public class UpdateAccountDto {
    private Double balance;
    private Long id;

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
