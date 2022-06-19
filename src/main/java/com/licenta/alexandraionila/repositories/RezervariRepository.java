package com.licenta.alexandraionila.repositories;

import com.licenta.alexandraionila.entities.Rezervare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RezervariRepository extends JpaRepository<Rezervare, Integer> {

    Optional<Rezervare> findRezervareById(UUID id);
}
