package com.licenta.alexandraionila.services;

import com.google.zxing.WriterException;
import com.licenta.alexandraionila.entities.Centru;
import com.licenta.alexandraionila.entities.Rezervare;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RezervariService {
    Rezervare save(Rezervare rezervare);
    Optional<Rezervare> findById(UUID id);
    List<Rezervare> findAll();
    byte[] getRezervareQR(Rezervare rezervare, Centru centru) throws IOException, WriterException;
    String getRezervareQRFile(Rezervare rezervare, Centru centru) throws IOException, WriterException;
}
