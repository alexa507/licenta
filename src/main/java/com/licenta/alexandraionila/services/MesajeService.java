package com.licenta.alexandraionila.services;

import com.licenta.alexandraionila.entities.Mesaj;

import java.util.List;

public interface MesajeService {

    List<Mesaj> findAll();
    Mesaj save(Mesaj mesaj);
}
