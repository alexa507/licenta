package com.licenta.alexandraionila.dtos;

import javax.persistence.Column;
import java.util.List;

public class CentruDTO {

    private String nume;
    private String adresa;
    private String oras;
    private String telefon;
    private String email;
    private List<String> utilitati;
    private Integer nrLocuriMax;
    private Integer nrLocuriLibere;
    private Float latitudine;
    private Float longitudine;

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getOras() {
        return oras;
    }

    public void setOras(String oras) {
        this.oras = oras;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getUtilitati() {
        return utilitati;
    }

    public void setUtilitati(List<String> utilitati) {
        this.utilitati = utilitati;
    }

    public Integer getNrLocuriMax() {
        return nrLocuriMax;
    }

    public void setNrLocuriMax(Integer nrLocuriMax) {
        this.nrLocuriMax = nrLocuriMax;
    }

    public Integer getNrLocuriLibere() {
        return nrLocuriLibere;
    }

    public void setNrLocuriLibere(Integer nrLocuriLibere) {
        this.nrLocuriLibere = nrLocuriLibere;
    }

    public Float getLatitudine() {
        return latitudine;
    }

    public void setLatitudine(Float latitudine) {
        this.latitudine = latitudine;
    }

    public Float getLongitudine() {
        return longitudine;
    }

    public void setLongitudine(Float longitudine) {
        this.longitudine = longitudine;
    }
}
