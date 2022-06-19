package com.licenta.alexandraionila.repositories;

import com.licenta.alexandraionila.entities.Mesaj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MesajeRepository extends JpaRepository<Mesaj, Integer> {

    List<Mesaj> findAll();
}
