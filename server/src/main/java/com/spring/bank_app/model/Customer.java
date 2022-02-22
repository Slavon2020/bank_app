package com.spring.bank_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
//@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
//@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customers",  uniqueConstraints = {
        @UniqueConstraint(
                columnNames = {"email"}
        )
})
public class Customer {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String name;
    private String email;
    private Integer age;
    @JsonIgnore
    private String password;
    private Integer phoneNumber;

    @ManyToMany(mappedBy = "customers")
    private Set<Employer> employers = new HashSet<>();

    @OneToMany(mappedBy = "customer", cascade = {CascadeType.ALL}, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Account> accounts;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return Objects.equals(id, customer.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}