package com.spring.bank_app.dao;

import com.spring.bank_app.dto.AccountDto.UpdateAccountDto;
import com.spring.bank_app.interfaces.Dao;
import com.spring.bank_app.model.Account;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class AccountDaoImpl implements Dao<Account> {

    private List<Account> accounts;
    private static Long id = 1l;

    AccountDaoImpl() {
        this.accounts = new ArrayList<>();
    }

    @Override
    public Account save(Account account) {
        account.setId(id++);
        this.accounts.add(account);
        return account;
    }

    @Override
    public boolean delete(Account account) {
        if (this.accounts.contains(account)) {
            this.accounts.remove(account);
            return true;
        }
        return false;
    }

    @Override
    public void deleteAll(List<Account> accounts) {
        this.accounts.stream().filter((account -> !accounts.contains(account)));
    }

    @Override
    public void saveAll(List<Account> accounts) {
        accounts.forEach((ac) -> save(ac));
    }

    @Override
    public List<Account> findAll() {
        return this.accounts;
    }

    @Override
    public boolean deleteById(long id) {
        if (this.accounts.size() >= id) {
            this.accounts.remove((int)id);
            return true;
        }
        return false;
    }

    @Override
    public Account getOne(long id) {
        return this.accounts.get((int)(id + 1));
    }

    public Account getAccountByNumber(String number) {
        Account toReturn = null;
        for (Account account : this.accounts) {
            if (account.getNumber().equals(number)) {
                toReturn = account;
            }
        }
        return toReturn;
    }

    public Account updateAccount(String accNumber, Double newBalance) {
        Account currentAcc = getAccountByNumber(accNumber);
        currentAcc.setBalance(newBalance);
        return currentAcc;
    }

    public void increaseBalance(String accNumber, Double diff) {
        Account account = getAccountByNumber(accNumber);
        account.setBalance(account.getBalance() + diff);
    }

    public boolean decreaseBalance(String accNumber, Double diff) {
        boolean isOperationPassed = false;
        Account account = getAccountByNumber(accNumber);
        Double currentBalance = account.getBalance();
        if (currentBalance >= diff) {
            account.setBalance(account.getBalance() - diff);
            isOperationPassed = true;
        }
        return isOperationPassed;
    }
}
