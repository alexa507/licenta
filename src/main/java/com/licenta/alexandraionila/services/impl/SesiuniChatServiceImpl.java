package com.licenta.alexandraionila.services.impl;

import com.licenta.alexandraionila.entities.SesiuneChat;
import com.licenta.alexandraionila.repositories.SesiuniChatRepository;
import com.licenta.alexandraionila.services.SesiuniChatService;
import liquibase.pro.packaged.L;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SesiuniChatServiceImpl implements SesiuniChatService {

    @Autowired
    private SesiuniChatRepository repository;

    @Override
    public Optional<SesiuneChat> findById(UUID id) {
        return repository.findById(id);
    }

    @Override
    public List<SesiuneChat> findAll() {
        return repository.findAll();
    }

    @Override
    public List<SesiuneChat> findAllSesiuniActive() {
        return repository.findAll().stream().filter(sesiuneChat -> sesiuneChat.isSesiuneActiva()).collect(
            Collectors.toList());
    }

    @Override
    public SesiuneChat updateSesiune(SesiuneChat sesiuneChat) {
        return repository.save(sesiuneChat);
    }

    @Override
    public SesiuneChat save(SesiuneChat sesiuneChat) {
        return repository.save(sesiuneChat);
    }

    @Override
    public Boolean existaSesiuneActivaPentruUser(String username) {
        var lista= repository.findAll().stream().filter(sesiuneChat -> sesiuneChat.isSesiuneActiva() &&
            sesiuneChat.getUsername().equals(username)).collect(Collectors.toList());
        if(lista.isEmpty()) {
            return false;
        }
        return true;
    }

    @Override
    public SesiuneChat findByUsernameAndActiva(String username) {
        return repository.findAll().stream().filter(sesiuneChat -> sesiuneChat.isSesiuneActiva() &&
            sesiuneChat.getUsername().equals(username)).collect(Collectors.toList()).get(0);
    }
}
