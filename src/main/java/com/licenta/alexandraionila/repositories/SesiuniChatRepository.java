package com.licenta.alexandraionila.repositories;

import com.licenta.alexandraionila.entities.SesiuneChat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SesiuniChatRepository extends JpaRepository<SesiuneChat, UUID> {

}
