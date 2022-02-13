package com.spring.bank_app.dao;

import com.spring.bank_app.interfaces.Dao;
import com.spring.bank_app.model.Employer;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class EmployerDaoImpl implements Dao<Employer> {
    private final EntityManager em;

    public EmployerDaoImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public Employer save(Employer employer) {
        em.persist(employer);
        return employer;
    }

    @Override
    public boolean delete(Employer employer) {
        if (em.contains(employer)) {
            em.remove(employer);
            return true;
        }
        return false;
    }

    @Override
    public void deleteAll(List<Employer> employers) {
        employers.forEach(this::delete);
    }

    @Override
    public void saveAll(List<Employer> employers) {
        employers.forEach(this::save);
    }

    @Override
    public List<Employer> findAll() {
        return em.createQuery("select e from Employer e", Employer.class).getResultList();
    }

    @Override
    public boolean deleteById(long id) {
        int isDeleted = em.createQuery("delete from Employer e where e.id=:id")
                .setParameter("id", id)
                .executeUpdate();
        return isDeleted == 1;
    }

    @Override
    public Employer getById(long id) {
        Optional<Employer> employer = Optional.ofNullable(
                em.createQuery(
                                "SELECT e FROM Employer e WHERE e.id =:id", Employer.class)
                        .setParameter("id", id)
                        .getSingleResult()
        );
        return employer.orElseThrow();
    }

    public List<Employer> getEmployers() {
        return em.createQuery("select e from Employer e", Employer.class).getResultList();
    }

    public Employer update(Employer employer) {
        Employer emp = em.find(Employer.class, employer.getId());
        emp.setName(employer.getName());
        emp.setAddress(employer.getAddress());
        em.merge(emp);
        return emp;
    }
}