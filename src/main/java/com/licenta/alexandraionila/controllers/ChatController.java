package com.licenta.alexandraionila.controllers;

import com.licenta.alexandraionila.dtos.ChatMessagDTO;
import com.licenta.alexandraionila.dtos.Message;
import com.pusher.rest.Pusher;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(value = "/api/chat", produces = {MediaType.APPLICATION_JSON_VALUE},
    consumes = {MediaType.APPLICATION_JSON_VALUE})
public class ChatController {

    @PostMapping
    public ResponseEntity<Message> chat(@RequestBody ChatMessagDTO message) {
        Pusher pusher = new Pusher("1427342", "016cecd0a709158028dd", "df69e00739b3e1537a41");
        pusher.setCluster("eu");
        pusher.setEncrypted(true);

        pusher.trigger("licenta-alexandra-ionila", "chat-message", message);

        return ResponseEntity.ok(new Message("Mesajul a fost trimis cu succes"));
    }

}
