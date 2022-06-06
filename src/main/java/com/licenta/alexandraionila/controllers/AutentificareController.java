package com.licenta.alexandraionila.controllers;

import com.licenta.alexandraionila.config.jwt.JwtUtils;
import com.licenta.alexandraionila.config.user.UserDetailsImpl;
import com.licenta.alexandraionila.dtos.AutentificareDTO;
import com.licenta.alexandraionila.dtos.InregistrareDTO;
import com.licenta.alexandraionila.dtos.JwtDTO;
import com.licenta.alexandraionila.entities.EnumerareRoluri;
import com.licenta.alexandraionila.entities.Rol;
import com.licenta.alexandraionila.entities.User;
import com.licenta.alexandraionila.exceptions.RolNotFoundException;
import com.licenta.alexandraionila.repositories.RolRepository;
import com.licenta.alexandraionila.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AutentificareController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RolRepository rolRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping(path = "/autentificare", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser(@RequestBody AutentificareDTO autentificareDTO) {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(autentificareDTO.getUsername(), autentificareDTO.getParola()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roluri = userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtDTO(jwt,
            userDetails.getId(),
            userDetails.getUsername(),
            userDetails.getEmail(),
            roluri));
    }

    @PostMapping(path = "/inregistrare", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerUser(@RequestBody InregistrareDTO inregistrareDTO) {
        if (userRepository.existsByUsername(inregistrareDTO.getUsername())) {
            return ResponseEntity
                .badRequest()
                .body("Eroare: Username-ul este deja folosit!");
        }

        if (userRepository.existsByEmail(inregistrareDTO.getEmail())) {
            return ResponseEntity
                .badRequest()
                .body("Eroare: Email-ul este deja folosit!");
        }

        // creare user si salvare in DB
        User user = new User();
        user.setPrenume(inregistrareDTO.getPrenume());
        user.setNume(inregistrareDTO.getNume());
        user.setUsername(inregistrareDTO.getUsername());
        user.setParola(encoder.encode(inregistrareDTO.getParola()));
        user.setEmail(inregistrareDTO.getEmail());

        Set<String> roluriStr = inregistrareDTO.getRol();
        Set<Rol> roluri = new HashSet<>();

        if (roluriStr == null) {
            Rol userRole = rolRepository.findByNume(EnumerareRoluri.USER)
                .orElseThrow(() -> new RolNotFoundException("Eroare: Rolul nu a fost gasit."));
            roluri.add(userRole);
        } else {
            roluriStr.forEach(role -> {
                switch (role) {
                    case "admin":
                        Rol adminRole = rolRepository.findByNume(EnumerareRoluri.ADMIN)
                            .orElseThrow(() -> new RolNotFoundException("Eroare: Rolul nu a fost gasit."));
                        roluri.add(adminRole);
                        break;
                    default:
                        Rol userRole = rolRepository.findByNume(EnumerareRoluri.USER)
                            .orElseThrow(() -> new RolNotFoundException("Eroare: Rolul nu a fost gasit."));
                        roluri.add(userRole);
                }
            });
        }

        user.setRoluri(roluri);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
