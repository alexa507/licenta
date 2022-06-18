package com.licenta.alexandraionila.repositories;

import com.licenta.alexandraionila.entities.Centru;
import com.licenta.alexandraionila.entities.Rezervare;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RezervariRepository extends JpaRepository<Rezervare, Integer> {

    Optional<Rezervare> findRezervareById(UUID id);
}
