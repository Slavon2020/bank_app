package com.spring.bank_app.controller;

import com.spring.bank_app.dto.AccountDto.AccountDto;
import com.spring.bank_app.dto.AccountDto.TransferMoneyDto;
import com.spring.bank_app.dto.AccountDto.UpdateAccountDto;
import com.spring.bank_app.model.Account;
import com.spring.bank_app.service.AccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    private final AccountService accountService;

    public AccountController (AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public Account save(@RequestBody AccountDto accountDto) {
        return accountService.save(accountDto);
    }

    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @PutMapping
    public Account updateAccount(@RequestBody UpdateAccountDto updateAccountDto) {
        System.out.println(updateAccountDto);
     return accountService.updateAccount(updateAccountDto);
    }

    @PutMapping("/transfer")
    public TransferMoneyDto transferMoney(@RequestBody TransferMoneyDto transferMoneyDto) {
        return accountService.transferMoney(transferMoneyDto);
    }

    @DeleteMapping
    public void deleteAccount(@RequestParam(value = "number") String number) {
        accountService.deleteAccount(number);
    }
}
