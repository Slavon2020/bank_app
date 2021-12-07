package com.spring.bank_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Employer")
public class Employer extends AbstractModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "Employer_Customer",
            joinColumns = { @JoinColumn(name = "employer_id") },
            inverseJoinColumns = { @JoinColumn(name = "customer_id") }
    )
    @JsonIgnore
    private Set<Customer> customers;
}
