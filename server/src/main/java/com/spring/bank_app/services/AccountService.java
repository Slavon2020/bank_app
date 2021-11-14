package com.spring.bank_app.services;

import com.spring.bank_app.dao.AccountDaoImpl;
import com.spring.bank_app.dao.CustomerDaoImpl;
import com.spring.bank_app.dto.AccountDto;
import com.spring.bank_app.model.Account;
import com.spring.bank_app.model.Currency;
import com.spring.bank_app.model.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    private final AccountDaoImpl accountDao;
    private final CustomerDaoImpl customerDao;

    public AccountService(AccountDaoImpl accountDao, CustomerDaoImpl customerDao) {
        this.accountDao = accountDao;
        this.customerDao = customerDao;
    }

    public Account save(AccountDto accountDto) {
        Long customerId = accountDto.getCustomerId();
        Currency currency = accountDto.getCurrency();
        Customer customer = customerDao.getOne(customerId);
        Account newAccount = accountDao.save(new Account(customer, currency));
        customer.addAccount(newAccount);
        return newAccount;
    }

    public List<Account> getAllAccounts() {
        return accountDao.findAll();
    }

    public void deleteAccount(String number) {
        Account accountToDelete = accountDao.getAccountByNumber(number);
        accountDao.delete(accountToDelete);
        accountToDelete.getCustomer().deleteAccount(accountToDelete);
    }
}
