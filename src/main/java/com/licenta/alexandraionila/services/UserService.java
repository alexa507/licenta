package com.licenta.alexandraionila.services;

import com.licenta.alexandraionila.entities.User;

import java.util.Optional;

public interface UserService {

    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    User save(User user);
}
