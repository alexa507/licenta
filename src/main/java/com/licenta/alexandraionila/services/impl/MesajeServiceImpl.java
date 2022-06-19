package com.licenta.alexandraionila.services.impl;

import com.licenta.alexandraionila.entities.Mesaj;
import com.licenta.alexandraionila.repositories.MesajeRepository;
import com.licenta.alexandraionila.services.MesajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MesajeServiceImpl implements MesajeService {

    @Autowired MesajeRepository repository;

    @Override
    public List<Mesaj> findAll() {
        return repository.findAll();
    }

    @Override
    public Mesaj save(Mesaj mesaj) {
        return repository.save(mesaj);
    }
}
