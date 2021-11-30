package com.spring.bank_app.controller;

import com.spring.bank_app.model.Employer;
import com.spring.bank_app.service.EmployerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employers")
public class EmployerController {
    private final EmployerService employerService;

    public EmployerController(EmployerService employerService) {
        this.employerService = employerService;
    }

    @PostMapping
    public Employer save(@RequestBody Employer employer) {
        return employerService.save(employer);
    }

    @GetMapping
    public List<Employer> getEmployers() {
        return employerService.getEmployers();
    }
}
