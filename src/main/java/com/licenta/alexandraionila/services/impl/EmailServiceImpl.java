package com.licenta.alexandraionila.services.impl;

import com.licenta.alexandraionila.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Service
public class EmailServiceImpl implements EmailService {

    private static final String NOREPLY_ADDRESS = "noreply@anti-violenta-domestica.com";

    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void sendEmail(String catre, String subiect, String text, String pathQR) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            // pass 'true' to the constructor to create a multipart message
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(NOREPLY_ADDRESS);
            helper.setTo(catre);
            helper.setSubject(subiect);
            helper.setText(text);

            FileSystemResource file = new FileSystemResource(new File(pathQR));
            helper.addAttachment("Cod QR Rezervare.png", file);

            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
