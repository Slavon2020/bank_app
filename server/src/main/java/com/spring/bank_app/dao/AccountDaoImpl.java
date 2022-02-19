package com.spring.bank_app.dao;

import com.spring.bank_app.interfaces.Dao;
import com.spring.bank_app.model.Account;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Repository
@Transactional
public class AccountDaoImpl implements Dao<Account> {
    private final EntityManager em;

    public AccountDaoImpl(EntityManager entityManager) {
        this.em = entityManager;
    }

    @Override
    public Account save(Account account) {
        em.persist(account);
        return account;
    }

    @Override
    public boolean delete(Account account) {
        Long id = account.getId();
        int isDeleted = em.createQuery("delete from Account a where a.id=:id")
                .setParameter("id", id)
                .executeUpdate();
        return isDeleted == 1;
    }

    @Override
    public void deleteAll(Set<Account> accounts) {
        accounts.forEach(this::delete);
    }

    @Override
    public void saveAll(Set<Account> accounts) {
        accounts.forEach(this::save);
    }

    @Override
    public Set<Account> findAll() {
        Set<Account> allAccounts = new HashSet<Account>(em.createQuery("select a from Account a", Account.class).getResultList());
        return allAccounts;
    }

    @Override
    public boolean deleteById(Long id) {
        int isDeleted = em.createQuery("delete from Account a where a.id=:id")
                .setParameter("id", id)
                .executeUpdate();
        return isDeleted == 1;
    }

    @Override
    public Account getById(Long id) {
        Optional<Account> account = Optional.ofNullable(
                em.createQuery(
                        "SELECT a FROM Account a WHERE a.id =:id", Account.class)
                        .setParameter("id", id)
                        .getSingleResult()
        );
        return account.orElseThrow();
    }

    public Account getByNumber(String number) {
        Optional<Account> account = Optional.ofNullable(
                em.createQuery(
                                "SELECT a FROM Account a WHERE a.number =:number", Account.class)
                        .setParameter("number", number)
                        .getSingleResult()
        );
        return account.orElseThrow();
    }

    public Account updateBalance(Long id, BigDecimal newBalance) {
        Account account = em.find(Account.class, id);
        account.setBalance(newBalance);
        em.merge(account);
        return account;
    }
}