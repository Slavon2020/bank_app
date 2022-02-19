package com.spring.bank_app.service;

import com.spring.bank_app.dao.EmployerDaoImpl;
import com.spring.bank_app.model.Employer;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class EmployerService {
    private final EmployerDaoImpl employerDao;

    public EmployerService(EmployerDaoImpl employerDao) {
        this.employerDao = employerDao;
    }

    public Employer save(Employer employer) {
        return employerDao.save(employer);
    }

    public Set<Employer> getEmployers() {
        return employerDao.getEmployers();
    }

    public boolean deleteEmployer(Long id) {
        return employerDao.deleteById(id);
    }

    public Employer update(Employer employer) {
        return employerDao.update(employer);
    }
}
