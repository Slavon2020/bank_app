package com.spring.bank_app.controller;

import com.spring.bank_app.dto.AccountDto.AccountDto;
import com.spring.bank_app.dto.AccountDto.TransferMoneyDto;
import com.spring.bank_app.dto.AccountDto.UpdateAccountDto;
import com.spring.bank_app.model.Account;
import com.spring.bank_app.service.AccountService;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/accounts")
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
    public Set<Account> getAll() {
        return accountService.getAll();
    }

    @PutMapping
    public Account update(@RequestBody UpdateAccountDto updateAccountDto) {
     return accountService.update(updateAccountDto);
    }

    @PutMapping("/transfer")
    public TransferMoneyDto transferMoney(@RequestBody TransferMoneyDto transferMoneyDto) {
        return accountService.transferMoney(transferMoneyDto);
    }

    @DeleteMapping
    public Map<String, Boolean> delete(@RequestParam(value = "number") String number) {
        if (accountService.delete(number)) {
            return Collections.singletonMap("deleted", true);
        }
        return Collections.singletonMap("deleted", false);
    };
}