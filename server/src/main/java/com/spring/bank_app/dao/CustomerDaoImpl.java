package com.spring.bank_app.dao;

import com.spring.bank_app.dto.CustomerDto.CustomerDto;
import com.spring.bank_app.dto.CustomerEmployerDto;
import com.spring.bank_app.interfaces.Dao;
import com.spring.bank_app.model.Customer;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class CustomerDaoImpl implements Dao<Customer> {
    private final EntityManager em;

    CustomerDaoImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public Customer save(Customer customer) {
        em.persist(customer);
        return customer;
    }

    @Override
    public boolean delete(Customer customer) {
        if (em.contains(customer)) {
            em.remove(customer);
            em.close();
            return true;
        }
        return false;
    }

    @Override
    public void deleteAll(List<Customer> customers) {
        customers.forEach(this::delete);
    }

    @Override
    public void saveAll(List<Customer> customers) {
        customers.forEach(this::save);
    }

    @Override
    public List<Customer> findAll() {
        return em.createQuery("select c from Customer c", Customer.class).getResultList();
    }

    @Override
    public boolean deleteById(long id) {
        int isDeleted = em.createQuery("delete from Customer c where c.id=:id")
                .setParameter("id", id)
                .executeUpdate();
        return isDeleted == 1;
    }

    @Override
    public Customer getById(long id) {
        Optional<Customer> customer = Optional.ofNullable(
                 em.createQuery(
                 "SELECT c FROM Customer c WHERE c.id =:id", Customer.class)
                .setParameter("id", id)
                .getSingleResult()
        );
        return customer.orElseThrow();
    }

    public Customer update(CustomerDto customerDto) {
        Customer customer = em.find(Customer.class, customerDto.getId());
        customer.setEmail(customerDto.getEmail());
        customer.setName(customerDto.getName());
        em.merge(customer);
        return customer;
    }

    public void addEmployer(CustomerEmployerDto customerEmployerDto) {
        Long customerId = customerEmployerDto.getCustomerId();
        Long employerId = customerEmployerDto.getEmployerId();
        em.createNativeQuery("INSERT into employer_customer(employer_id, customer_id) VALUES(?, ?)")
                .setParameter(1, employerId)
                .setParameter(2, customerId)
                .executeUpdate();
    }
}