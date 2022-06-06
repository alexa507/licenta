package com.licenta.alexandraionila.repositories;

import com.licenta.alexandraionila.entities.Centru;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CentruRepository extends JpaRepository<Centru, Integer> {

    List<Centru> findAll();
    Optional<Centru> findByNume(String nume);
    List<Centru> findByNrLocuriLibereAfter(Integer nrLocuri);
}
