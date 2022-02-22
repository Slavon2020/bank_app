package com.spring.bank_app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import static javax.persistence.GenerationType.IDENTITY;

@MappedSuperclass
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public abstract class AbstractModel {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
}
