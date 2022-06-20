package com.licenta.alexandraionila.services.impl;

import com.google.zxing.WriterException;
import com.licenta.alexandraionila.entities.Centru;
import com.licenta.alexandraionila.entities.Rezervare;
import com.licenta.alexandraionila.repositories.RezervariRepository;
import com.licenta.alexandraionila.services.QRGeneratorService;
import com.licenta.alexandraionila.services.RezervariService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RezervariServiceImpl implements RezervariService {

    @Autowired RezervariRepository repository;

    @Autowired QRGeneratorService qrService;

    @Override
    public Optional<Rezervare> findById(UUID id) {
        return repository.findRezervareById(id);
    }

    @Override
    public Rezervare save(Rezervare rezervare) {
        return repository.save(rezervare);
    }

    @Override
    public List<Rezervare> findAll() {
        return repository.findAll();
    }

    @Override
    public byte[] getRezervareQR(Rezervare rezervare, Centru centru)
        throws IOException, WriterException {
        return qrService.generateQRCodeByteArray(rezervare, centru);
    }

    @Override
    public String getRezervareQRFile(Rezervare rezervare, Centru centru)
        throws IOException, WriterException {
        return qrService.generateQRCodeImageAndSendEmail(rezervare, centru);
    }
}
