package com.licenta.alexandraionila.services;

import com.licenta.alexandraionila.entities.SesiuneChat;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SesiuniChatService {
    Optional<SesiuneChat> findById(UUID id);
    List<SesiuneChat> findAll();
    List<SesiuneChat> findAllSesiuniActive();
    SesiuneChat updateSesiune(SesiuneChat sesiuneChat);
    SesiuneChat save(SesiuneChat sesiuneChat);
    Boolean existaSesiuneActivaPentruUser(String username);
    SesiuneChat findByUsernameAndActiva(String username);
}
