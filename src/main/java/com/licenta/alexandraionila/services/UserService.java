package com.licenta.alexandraionila.services;

import com.licenta.alexandraionila.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    Optional<User> findByUsername(String username);
    Optional<User> findById(int id);
    List<User> findAll();
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsById(int id);
    User save(User user);
    void delete(int id);
}
