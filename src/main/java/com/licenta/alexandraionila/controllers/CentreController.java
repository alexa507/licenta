package com.licenta.alexandraionila.controllers;

import com.licenta.alexandraionila.dtos.CentruDTO;
import com.licenta.alexandraionila.entities.Centru;
import com.licenta.alexandraionila.services.CentreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<String> creazaCentru(@RequestBody CentruDTO centruDTO) {
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

        centreService.save(centru);

        return ResponseEntity.ok("Centrul a fost salvat cu succes!");
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<String> editCentru(@PathVariable Integer id, @RequestBody CentruDTO centruDTO) {
        if(centreService.findById(id).isEmpty()) {
            return  ResponseEntity.badRequest().body("Centrul nu exista!");
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
        return ResponseEntity.ok("Centrul a fost editat cu succes!");
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteCentru(@PathVariable Integer id) {
        if(centreService.findById(id).isEmpty()) {
            return  ResponseEntity.badRequest().body("Centrul nu exista!");
        }

        centreService.delete(id);

        return ResponseEntity.ok("Centrul a fost sters cu succes!");
    }
}
