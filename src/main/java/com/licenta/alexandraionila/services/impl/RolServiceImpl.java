package com.licenta.alexandraionila.services.impl;

import com.licenta.alexandraionila.entities.EnumerareRoluri;
import com.licenta.alexandraionila.entities.Rol;
import com.licenta.alexandraionila.repositories.RolRepository;
import com.licenta.alexandraionila.services.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RolServiceImpl implements RolService {

    @Autowired
    private RolRepository repository;

    @Override
    public Optional<Rol> findByNume(EnumerareRoluri nume) {
        return repository.findByNume(nume);
    }
}
