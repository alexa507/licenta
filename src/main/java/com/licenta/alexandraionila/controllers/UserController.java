package com.licenta.alexandraionila.controllers;

import com.licenta.alexandraionila.dtos.Message;
import com.licenta.alexandraionila.entities.Centru;
import com.licenta.alexandraionila.entities.User;
import com.licenta.alexandraionila.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/users", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(path = "/all")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Message> delete(Integer id) {
        userService.delete(id);
        return ResponseEntity.ok(new Message("User-ul a fost sters cu succes"));
    }
}
