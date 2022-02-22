package com.spring.bank_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
//@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
//@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "accounts",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"number"}
                )
        })
public  class Account {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String number;
    private Currency currency;
    private BigDecimal balance;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    public Account(Customer customer, Currency currency ) {
        this.currency = currency;
        this.customer = customer;
        this.number = UUID.randomUUID().toString();
        this.balance = new BigDecimal("0");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return Objects.equals(id, account.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}