package com.licenta.alexandraionila.services;

import com.licenta.alexandraionila.entities.EnumerareRoluri;
import com.licenta.alexandraionila.entities.Rol;

import java.util.Optional;

public interface RolService {

    Optional<Rol> findByNume(EnumerareRoluri nume);
}
