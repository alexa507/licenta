package com.licenta.alexandraionila.controllers;

import com.licenta.alexandraionila.dtos.CentruDTO;
import com.licenta.alexandraionila.dtos.Message;
import com.licenta.alexandraionila.entities.Centru;
import com.licenta.alexandraionila.services.CentreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/centre", produces = {MediaType.APPLICATION_JSON_VALUE},
    consumes = {MediaType.APPLICATION_JSON_VALUE})
public class CentreController {

    @Autowired
    CentreService centreService;

    @GetMapping(path = "/all")
    public ResponseEntity<List<Centru>> findAll() {
        return ResponseEntity.ok(centreService.findAll());
    }

    @GetMapping(path = "/{nume}")
    public ResponseEntity<Centru> findByNume(@PathVariable String nume) {
        return ResponseEntity.ok(centreService.findByNume(nume).get());
    }

    @GetMapping(path= "/locuriLibere/{numar}")
    public ResponseEntity<List<Centru>> findByLocuriLiberMin(@PathVariable Integer numar) {
        return ResponseEntity.ok(centreService.findByNrLocuriLibereAfter(numar));
    }

    @PostMapping
    public ResponseEntity<Centru> creazaCentru(@RequestBody @Valid CentruDTO centruDTO) {
        Centru centru = new Centru();
        centru.setAdresa(centruDTO.getAdresa());
        centru.setEmail(centruDTO.getEmail());
        centru.setLatitudine(centruDTO.getLatitudine());
        centru.setLongitudine(centruDTO.getLongitudine());
        centru.setNrLocuriLibere(centruDTO.getNrLocuriLibere());
        centru.setNrLocuriMax(centruDTO.getNrLocuriMax());
        centru.setNume(centruDTO.getNume());
        centru.setTelefon(centruDTO.getTelefon());
        centru.setUtilitati(String.join(",", centruDTO.getUtilitati()));
        centru.setOras(centruDTO.getOras());

        return ResponseEntity.ok(centreService.save(centru));
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<Message> editCentru(@PathVariable Integer id, @RequestBody @Valid CentruDTO centruDTO) {
        if(centreService.findById(id).isEmpty()) {
            return  ResponseEntity.badRequest().body(new Message("Centrul nu exista!"));
        }

        Centru centruPtEdit = centreService.findById(id).get();
        centruPtEdit.setAdresa(centruDTO.getAdresa());
        centruPtEdit.setEmail(centruDTO.getEmail());
        centruPtEdit.setLatitudine(centruDTO.getLatitudine());
        centruPtEdit.setLongitudine(centruDTO.getLongitudine());
        centruPtEdit.setNrLocuriLibere(centruDTO.getNrLocuriLibere());
        centruPtEdit.setNrLocuriMax(centruDTO.getNrLocuriMax());
        centruPtEdit.setNume(centruDTO.getNume());
        centruPtEdit.setTelefon(centruDTO.getTelefon());
        centruPtEdit.setUtilitati(String.join(",", centruDTO.getUtilitati()));
        centruPtEdit.setOras(centruDTO.getOras());

        centreService.save(centruPtEdit);
        return ResponseEntity.ok(new Message("Centrul a fost editat cu succes!"));
    }

    @PatchMapping(path = "/ocupaLocuri/{id}/{nrLocuriOcupate}")
    public ResponseEntity<Message> editCentruPentruAOcupaLocuri(@PathVariable Integer id, @PathVariable Integer nrLocuriOcupate) {
        if(centreService.findById(id).isEmpty()) {
            return  ResponseEntity.badRequest().body(new Message("Centrul nu exista!"));
        }
        Centru centru = centreService.findById(id).get();
        centru.setNrLocuriLibere(centru.getNrLocuriLibere() - nrLocuriOcupate);

        centreService.save(centru);
        return ResponseEntity.ok(new Message("Locurile au fost ocupate cu succes in centrul: " + centru.getNume()));
    }

    @DeleteMapping(path = "/sterge/{id}")
    public ResponseEntity<Message> deleteCentru(@PathVariable String id) {
        if(centreService.findById(Integer.valueOf(id)).isEmpty()) {
            return  ResponseEntity.badRequest().body(new Message("Centrul nu exista!"));
        }

        centreService.delete(Integer.valueOf(id));

        return ResponseEntity.ok(new Message("Centrul a fost sters cu succes!"));
    }
}
