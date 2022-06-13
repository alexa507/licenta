package com.licenta.alexandraionila.services.impl;

import com.licenta.alexandraionila.entities.Centru;
import com.licenta.alexandraionila.repositories.CentruRepository;
import com.licenta.alexandraionila.services.CentreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CentruServiceImpl implements CentreService {

    @Autowired
    private CentruRepository repository;

    @Override
    public List<Centru> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Centru> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Centru> findByNume(String nume) {
        return repository.findByNume(nume);
    }

    @Override
    public List<Centru> findByNrLocuriLibereAfter(Integer nrLocuri) {
        return repository.findByNrLocuriLibereAfter(nrLocuri);
    }

    @Override
    public Centru save(Centru centru) {
        return repository.save(centru);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
