package com.licenta.alexandraionila.controllers;

import com.licenta.alexandraionila.dtos.Message;
import com.licenta.alexandraionila.dtos.UserDTO;
import com.licenta.alexandraionila.entities.EnumerareRoluri;
import com.licenta.alexandraionila.entities.Rol;
import com.licenta.alexandraionila.entities.User;
import com.licenta.alexandraionila.exceptions.RolNotFoundException;
import com.licenta.alexandraionila.exceptions.UserNotFoundException;
import com.licenta.alexandraionila.services.RolService;
import com.licenta.alexandraionila.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/users", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RolService rolService;

    @GetMapping(path = "/all")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Message> delete(@PathVariable int id) {
        if(!userService.existsById(id)) {
            throw new UserNotFoundException("User-ul nu a fost gasit!");
        }
        userService.delete(id);
        return ResponseEntity.ok(new Message("User-ul a fost sters cu succes"));
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<Message> update(@PathVariable int id, @RequestBody UserDTO userDTO) {
        if(!userService.existsById(id)) {
            throw new UserNotFoundException("User-ul nu a fost gasit!");
        }
        User user = userService.findById(id).get();
        user.setEmail(userDTO.getEmail());
        user.setNume(userDTO.getNume());
        user.setPrenume(userDTO.getPrenume());
        user.setUsername(userDTO.getUsername());

        List<String> roluriStr = userDTO.getRoluri();
        Set<Rol> roluri = new HashSet<>();

        if (roluriStr == null) {
            Rol userRole = rolService.findByNume(EnumerareRoluri.EDITOR)
                .orElseThrow(() -> new RolNotFoundException("Eroare: Rolul nu a fost gasit."));
            roluri.add(userRole);
        } else {
            roluriStr.forEach(role -> {
                switch (role) {
                    case "ADMIN":
                        Rol adminRole = rolService.findByNume(EnumerareRoluri.ADMIN)
                            .orElseThrow(() -> new RolNotFoundException("Eroare: Rolul nu a fost gasit."));
                        roluri.add(adminRole);
                        break;
                    default:
                        Rol editorRole = rolService.findByNume(EnumerareRoluri.EDITOR)
                            .orElseThrow(() -> new RolNotFoundException("Eroare: Rolul nu a fost gasit."));
                        roluri.add(editorRole);
                }
            });
        }

        user.setRoluri(roluri);
        userService.save(user);
        return ResponseEntity.ok(new Message("User-ul a fost editat cu succes!"));
    }
}
