package com.licenta.alexandraionila.dtos;

import java.util.UUID;

public class RezervateRequestDTO {
    String nume;
    String prenume;
    Integer numarPersoane;
    String mentiuni;
    Integer idCentru;

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getPrenume() {
        return prenume;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public Integer getNumarPersoane() {
        return numarPersoane;
    }

    public void setNumarPersoane(Integer numarPersoane) {
        this.numarPersoane = numarPersoane;
    }

    public String getMentiuni() {
        return mentiuni;
    }

    public void setMentiuni(String mentiuni) {
        this.mentiuni = mentiuni;
    }

    public Integer getIdCentru() {
        return idCentru;
    }

    public void setIdCentru(Integer idCentru) {
        this.idCentru = idCentru;
    }
}
