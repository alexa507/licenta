package com.licenta.alexandraionila.services.impl;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.licenta.alexandraionila.entities.Centru;
import com.licenta.alexandraionila.entities.Rezervare;
import com.licenta.alexandraionila.services.EmailService;
import com.licenta.alexandraionila.services.QRGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

@Service
public class QRGeneratorServiceImpl implements QRGeneratorService {

    private static String filePath = "C:/Users/ruben.ionila/Desktop/LICENTA/licenta-alexandra-ionila/interfata/src/assets/";

    @Autowired
    private EmailService emailService;

    @Override
    public String generateQRCodeImageAndSendEmail(Rezervare rezervare, Centru centru) throws IOException,
        WriterException {
        String qrContent = getStringContent(rezervare, centru);

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrContent, BarcodeFormat.QR_CODE, 500, 500);
        Path path = FileSystems.getDefault().getPath(filePath + rezervare.getId().toString() + ".png");
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
        //trimite mail catre end-user
        emailService.sendEmail(rezervare.getEmail(), "Rezervare pentru centrul: " + centru.getNume(),
            "Rezervarea dumneavoastra cu id-ul: " + rezervare.getId() + "a fost efectuata. Gasiti atasat codul QR.",
            path.toString());
        //trimite mail catre centru
        emailService.sendEmail(centru.getEmail(), "Rezervare pentru: " + rezervare.getNume(),
            "Rezervarea cu id-ul: " + rezervare.getId() + "a fost efectuata. Gasiti atasat codul QR.",
            path.toString());

        return filePath + rezervare.getId().toString();
    }

    @Override
    public byte[] generateQRCodeByteArray(Rezervare rezervare, Centru centru)
        throws IOException, WriterException {
        String qrContent = getStringContent(rezervare, centru);

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrContent, BarcodeFormat.QR_CODE, 500, 500);

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageConfig con = new MatrixToImageConfig( 0xFF000002 , 0xFFFFC041 ) ;

        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream,con);
        byte[] pngData = pngOutputStream.toByteArray();
        return pngData;
    }

    private String getStringContent(Rezervare rezervare, Centru centru) {
        return String.format("Id rezervare: %s, Centru: %s, "
                + "Oras: %s, Nume: %s, Prenume: %s, Nr persoane: %s, Mentiuni: %s",
            rezervare.getId().toString(), centru.getNume(), centru.getOras(),
            rezervare.getNume(), rezervare.getPrenume(), rezervare.getNrPersoane().toString(),
            rezervare.getMentiuni());
    }
}
