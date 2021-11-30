package com.spring.bank_app.service;

import com.spring.bank_app.dao.EmployerDaoImpl;
import com.spring.bank_app.model.Employer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployerService {
    private final EmployerDaoImpl employerDao;

    public EmployerService(EmployerDaoImpl employerDao) {
        this.employerDao = employerDao;
    }

    public Employer save(Employer employer) {
        return employerDao.save(employer);
    }

    public List<Employer> getEmployers() {
        return employerDao.getEmployers();
    }
}