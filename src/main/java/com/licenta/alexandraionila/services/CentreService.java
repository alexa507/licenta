package com.licenta.alexandraionila.services;

import com.licenta.alexandraionila.entities.Centru;

import java.util.List;
import java.util.Optional;

public interface CentreService {

    List<Centru> findAll();
    Optional<Centru> findById(Integer id);
    Optional<Centru> findByNume(String nume);
    List<Centru> findByNrLocuriLibereAfter(Integer nrLocuri);
    Centru save(Centru centru);
    void delete(Integer id);
}
