package com.spring.bank_app.controller;

import com.spring.bank_app.dto.AccountDto;
import com.spring.bank_app.model.Account;
import com.spring.bank_app.services.AccountService;
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

    @DeleteMapping
    public void deleteAccount(@RequestParam(value = "number") String number) {
        accountService.deleteAccount(number);
    }
}
