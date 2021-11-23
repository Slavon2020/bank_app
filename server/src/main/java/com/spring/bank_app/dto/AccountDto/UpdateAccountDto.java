package com.spring.bank_app.dto.AccountDto;

public class UpdateAccountDto {
    private Double balance;
    private String number;

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
