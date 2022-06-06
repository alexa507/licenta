package com.licenta.alexandraionila.entities;

import javax.persistence.*;

@Entity
@Table(name = "centre")
public class Centru {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nume", columnDefinition = "TEXT")
    private String nume;

    @Column(name = "adresa", columnDefinition = "TEXT")
    private String adresa;

    @Column(name = "oras", columnDefinition = "TEXT")
    private String oras;

    @Column(name = "telefon", columnDefinition = "TEXT")
    private String telefon;

    @Column(name = "email", columnDefinition = "TEXT")
    private String email;

    @Column(name = "utilitati", columnDefinition = "TEXT")
    private String utilitati;

    @Column(name = "nr_locuri_max", columnDefinition = "INT")
    private Integer nrLocuriMax;

    @Column(name = "nr_locuri_libere", columnDefinition = "INT")
    private Integer nrLocuriLibere;

    @Column(name = "latitudine", columnDefinition = "float8")
    private Float latitudine;

    @Column(name = "longitudine", columnDefinition = "float8")
    private Float longitudine;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public String getUtilitati() {
        return utilitati;
    }

    public void setUtilitati(String utilitati) {
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
