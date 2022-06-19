package com.licenta.alexandraionila.controllers;

import com.licenta.alexandraionila.dtos.MesajDTO;
import com.licenta.alexandraionila.dtos.Message;
import com.licenta.alexandraionila.entities.Mesaj;
import com.licenta.alexandraionila.services.MesajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/mesaje", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
public class MesajeController {

    @Autowired MesajeService mesajeService;

    @GetMapping
    public ResponseEntity<List<Mesaj>> findAll() {
        return ResponseEntity.ok(mesajeService.findAll());
    }

    @PostMapping
    public ResponseEntity<Message> create(@RequestBody @Valid MesajDTO mesajDTO) {
        Mesaj mesaj = new Mesaj();
        mesaj.setMesaj(mesajDTO.getMesaj());
        mesaj.setEmail(mesajDTO.getEmail());
        mesaj.setNume(mesajDTO.getNume());
        mesaj.setPrenume(mesajDTO.getPrenume());
        mesaj.setDataCreare(new Date());

        mesajeService.save(mesaj);

        return ResponseEntity.ok(new Message("Mesajul a fost salvat cu succes!"));
    }
}
