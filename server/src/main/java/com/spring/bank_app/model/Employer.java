package com.spring.bank_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

//@EqualsAndHashCode(callSuper = true)

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@EqualsAndHashCode
@Table(name = "employers")
public class Employer {
    @Id
    @GeneratedValue(strategy = IDENTITY)
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employer employer = (Employer) o;
        return Objects.equals(id, employer.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
