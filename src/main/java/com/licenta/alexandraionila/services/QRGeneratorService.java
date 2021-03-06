package com.licenta.alexandraionila.services;

import com.google.zxing.WriterException;
import com.licenta.alexandraionila.entities.Centru;
import com.licenta.alexandraionila.entities.Rezervare;

import java.io.IOException;

public interface QRGeneratorService {

    String generateQRCodeImageAndSendEmail(Rezervare rezervare, Centru centru) throws IOException, WriterException;
    byte[] generateQRCodeByteArray(Rezervare rezervare, Centru centru) throws IOException, WriterException;
}
