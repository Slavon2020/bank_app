package com.spring.bank_app.controller;

import com.spring.bank_app.dto.CustomerDto;
import com.spring.bank_app.model.Customer;
import com.spring.bank_app.model.Employer;
import com.spring.bank_app.service.EmployerService;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/employers")
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

    @PutMapping
    public Employer updateEmployer(@RequestBody Employer employer) {
        return employerService.update(employer);
    }

    @DeleteMapping
    public Map<String, Boolean> deleteEmployer(@RequestParam(value = "id") Long id) {
        if(employerService.deleteEmployer(id)) {
            return Collections.singletonMap("deleted", true);
        }
        return Collections.singletonMap("deleted", false);
    }
}
