package com.licenta.alexandraionila.repositories;

import com.licenta.alexandraionila.entities.Centru;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CentruRepository extends JpaRepository<Centru, Integer> {

    List<Centru> findAll();
    Optional<Centru> findByNume(String nume);
    List<Centru> findByNrLocuriLibereAfter(Integer nrLocuri);
}
