package com.licenta.alexandraionila.controllers;

import com.google.zxing.WriterException;
import com.licenta.alexandraionila.dtos.RezervareResponseDTO;
import com.licenta.alexandraionila.dtos.RezervareRequestDTO;
import com.licenta.alexandraionila.entities.Rezervare;
import com.licenta.alexandraionila.exceptions.CentruNotFoundException;
import com.licenta.alexandraionila.services.CentreService;
import com.licenta.alexandraionila.services.RezervariService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping(value = "/api/rezervari", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
public class RezervariController {

    @Autowired
    CentreService centreService;

    @Autowired
    RezervariService rezervariService;

    @PostMapping()
    public ResponseEntity<RezervareResponseDTO> creazaRezervare(@RequestBody
        RezervareRequestDTO request)
        throws IOException, WriterException {
        Rezervare rezervare = new Rezervare();
        rezervare.setDataCreare(new Date());
        rezervare.setNume(request.getNume());
        rezervare.setPrenume(request.getPrenume());
        rezervare.setMentiuni(request.getMentiuni());
        rezervare.setNrPersoane(request.getNumarPersoane());
        rezervare.setEmail(request.getEmail());
        if(centreService.findById(request.getIdCentru()).isEmpty()) {
            throw new CentruNotFoundException("Centrul nu a fost gasit");
        }
        rezervare.setCentru(centreService.findById(request.getIdCentru()).get());
        Rezervare saved = rezervariService.save(rezervare);
        byte[] qr = rezervariService.getRezervareQR(saved, centreService.findById(saved.getCentru().getId()).get());
        String pathToImg = rezervariService.getRezervareQRFile(saved, centreService.findById(saved.getCentru().getId()).get());

        return ResponseEntity.ok(new RezervareResponseDTO(saved.getId(), qr, pathToImg));
    }
}
