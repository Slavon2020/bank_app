package com.spring.bank_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Customer")
public class Customer extends AbstractModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private Integer age;
    @JsonIgnore
    private String password;
    private Integer phoneNumber;

    @ManyToMany(mappedBy = "customers")
    private Set<Employer> employers;

    @OneToMany(mappedBy = "customer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Account> accounts;

    public Customer(Integer age, String email, String name) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.accounts = new HashSet<>();
    }
}