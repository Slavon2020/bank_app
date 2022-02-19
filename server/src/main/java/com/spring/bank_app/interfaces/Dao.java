package com.spring.bank_app.interfaces;

import java.util.Set;

public interface Dao <T> {
    T save(T obj);
    boolean delete(T obj);
    void deleteAll(Set<T> entities);
    void saveAll(Set<T> entities);
    Set<T> findAll();
    boolean deleteById(Long id);
    T getById(Long id);
}
