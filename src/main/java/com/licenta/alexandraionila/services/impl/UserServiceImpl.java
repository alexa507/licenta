package com.licenta.alexandraionila.services.impl;

import com.licenta.alexandraionila.entities.User;
import com.licenta.alexandraionila.repositories.UserRepository;
import com.licenta.alexandraionila.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Override
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public Optional<User> findByUsernameOrEmail(String username, String email) {
        return repository.findByUsernameOrEmail(username, email);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return repository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public void delete(int id) {
        repository.deleteById(Integer.valueOf(id));
    }

    @Override
    public Optional<User> findById(int id) { return repository.findById(Integer.valueOf(id)); }

    @Override
    public Boolean existsById(int id) { return repository.existsById(Integer.valueOf(id)); }
}
