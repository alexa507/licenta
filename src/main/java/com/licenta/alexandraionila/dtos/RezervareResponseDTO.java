package com.licenta.alexandraionila.dtos;

import java.util.UUID;

public class RezervareResponseDTO {
    private UUID idRezervare;
    private byte[] qrBytes;
    private String pathToImg;

    public RezervareResponseDTO(UUID idRezervare, byte[] qrBytes, String pathToImg) {
        this.idRezervare = idRezervare;
        this.qrBytes = qrBytes;
        this.pathToImg = pathToImg;
    }

    public UUID getIdRezervare() {
        return idRezervare;
    }

    public void setIdRezervare(UUID idRezervare) {
        this.idRezervare = idRezervare;
    }

    public byte[] getQrBytes() {
        return qrBytes;
    }

    public void setQrBytes(byte[] qrBytes) {
        this.qrBytes = qrBytes;
    }

    public String getPathToImg() {
        return pathToImg;
    }

    public void setPathToImg(String pathToImg) {
        this.pathToImg = pathToImg;
    }
}
