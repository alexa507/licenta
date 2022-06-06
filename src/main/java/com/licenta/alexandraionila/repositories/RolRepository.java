package com.licenta.alexandraionila.repositories;

import com.licenta.alexandraionila.entities.EnumerareRoluri;
import com.licenta.alexandraionila.entities.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
    Optional<Rol> findByNume(EnumerareRoluri name);
}
