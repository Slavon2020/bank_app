package com.spring.bank_app.dto.AccountDto;

import java.math.BigDecimal;

public class UpdateAccountDto {
    private BigDecimal balance;
    private Long id;

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
