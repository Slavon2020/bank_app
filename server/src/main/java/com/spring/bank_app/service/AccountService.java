package com.spring.bank_app.service;

import com.spring.bank_app.dao.AccountDaoImpl;
import com.spring.bank_app.dao.CustomerDaoImpl;
import com.spring.bank_app.dto.AccountDto.AccountDto;
import com.spring.bank_app.dto.AccountDto.TransferMoneyDto;
import com.spring.bank_app.dto.AccountDto.UpdateAccountDto;
import com.spring.bank_app.model.Account;
import com.spring.bank_app.model.Currency;
import com.spring.bank_app.model.Customer;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Set;

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
        Customer customer = customerDao.getById(customerId);
        Account newAccount = accountDao.save(new Account(customer, currency));
        return newAccount;
    }

    public Set<Account> getAll() {
        return accountDao.findAll();
    }

    public Account update(UpdateAccountDto updateAccountDto) {
        Long id = updateAccountDto.getId();
        BigDecimal newBalance = updateAccountDto.getBalance();
        return accountDao.updateBalance(id, newBalance);
    }

    public boolean delete(String number) {
        Account accountToDelete = accountDao.getByNumber(number);
        return accountDao.delete(accountToDelete);
    }

    @Transactional
    public TransferMoneyDto transferMoney(TransferMoneyDto transferMoneyDto) {
        BigDecimal sumAccFrom = transferMoneyDto.getSumAccFrom();

        Account accFrom = accountDao.getByNumber(transferMoneyDto.getAccNumberFrom());
        BigDecimal accFromBalance = accFrom.getBalance();

        if (accFromBalance.compareTo(sumAccFrom) > 0) {
            accFrom.setBalance(accFromBalance.subtract(sumAccFrom));

            Account accTo = accountDao.getByNumber(transferMoneyDto.getAccNumberTo());
            BigDecimal sumAccTo = transferMoneyDto.getSumAccTo();
            accTo.setBalance(accTo.getBalance().add(sumAccTo));
            return transferMoneyDto;
        }

        return null; // TODO: should be fixed
    }
}