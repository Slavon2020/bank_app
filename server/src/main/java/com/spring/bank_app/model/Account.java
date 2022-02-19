package com.spring.bank_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "accounts")
@NoArgsConstructor
public  class Account extends AbstractModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String number;
    private Currency currency;
    private BigDecimal balance;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    public Account(Customer customer, Currency currency ) {
        this.currency = currency;
        this.customer = customer;
        this.number = UUID.randomUUID().toString();
        this.balance = new BigDecimal("0");
    }
}