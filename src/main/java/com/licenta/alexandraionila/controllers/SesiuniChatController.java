package com.licenta.alexandraionila.controllers;

import com.licenta.alexandraionila.dtos.Message;
import com.licenta.alexandraionila.dtos.SesiuneChatDTO;
import com.licenta.alexandraionila.entities.SesiuneChat;
import com.licenta.alexandraionila.exceptions.SesiuneChatNotFoundException;
import com.licenta.alexandraionila.exceptions.SesiuneDuplicataPentruUserException;
import com.licenta.alexandraionila.services.SesiuniChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/sesiuniChat", produces = {MediaType.APPLICATION_JSON_VALUE},
    consumes = {MediaType.APPLICATION_JSON_VALUE})
public class SesiuniChatController {

    @Autowired
    private SesiuniChatService service;

    @GetMapping(path = "/all")
    public List<SesiuneChat> findAll() {
        return service.findAll();
    }

    @GetMapping(path = "/active")
    public List<SesiuneChat> findAllActive() {
        return service.findAllSesiuniActive();
    }

    @PostMapping
    public ResponseEntity<SesiuneChat> creaza(@RequestBody SesiuneChatDTO dto) {
        //verificam daca exista deja o sesiune activa pentru acest user
        // si o returnam pe aceea daca exista
        if(service.existaSesiuneActivaPentruUser(dto.getUsername())) {
            return ResponseEntity.ok(service.findByUsernameAndActiva(dto.getUsername()));
        } else {
            SesiuneChat sesiuneChat = new SesiuneChat();
            sesiuneChat.setNume(dto.getNume());
            sesiuneChat.setPrenume(dto.getPrenume());
            sesiuneChat.setUsername(dto.getUsername());
            sesiuneChat.setSesiuneActiva(true);

            SesiuneChat saved = service.save(sesiuneChat);
            return ResponseEntity.ok(saved);
        }
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<Message> dezactiveazaSesiune(@PathVariable String id) {
        if(!service.findById(UUID.fromString(id)).isPresent()) {
            throw new SesiuneChatNotFoundException("Sesiunea de chat nu a fost gasita!");
        }

        SesiuneChat sesiune = service.findById(UUID.fromString(id)).get();
        sesiune.setSesiuneActiva(false);
        service.save(sesiune);

        return ResponseEntity.ok(new Message("Sesiunea a fost dezactivata cu succes!"));
    }
}
