package com.licenta.alexandraionila.services;

public interface EmailService {

    void sendEmail(String catre, String subiect, String text, String pathQR);
}
