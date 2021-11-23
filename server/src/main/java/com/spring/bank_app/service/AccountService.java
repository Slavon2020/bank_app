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

    public Account updateAccount(UpdateAccountDto updateAccountDto) {
        String accNumber = updateAccountDto.getNumber();
        Double newBalance = updateAccountDto.getBalance();
        return accountDao.updateAccount(accNumber, newBalance);
    }

    public void deleteAccount(String number) {
        Account accountToDelete = accountDao.getAccountByNumber(number);
        accountDao.delete(accountToDelete);
        accountToDelete.getCustomer().deleteAccount(accountToDelete);
    }

    public TransferMoneyDto transferMoney(TransferMoneyDto transferMoneyDto) {
        String accNumberFrom = transferMoneyDto.getAccNumberFrom();
        Double sumAccFrom = transferMoneyDto.getSumAccFrom();
        boolean isOperationPassed = accountDao.decreaseBalance(accNumberFrom, sumAccFrom);

        String accNumberTo = transferMoneyDto.getAccNumberTo();
        Double sumAccTo = transferMoneyDto.getSumAccTo();
        accountDao.increaseBalance(accNumberTo, sumAccTo);
        if (isOperationPassed) {
            return transferMoneyDto;
        }
        return null;
    }
}
