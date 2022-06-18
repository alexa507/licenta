package com.licenta.alexandraionila.entities;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "rezervari")
public class Rezervare {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator",
        parameters = {
            @Parameter(
                name = "uuid_gen_strategy_class",
                value = "org.hibernate.id.uuid.CustomVersionOneStrategy"
            )
        }
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "nume")
    private String nume;

    @Column(name = "prenume")
    private String prenume;

    @Column(name = "nr_persoane")
    private Integer nrPersoane;

    @Column(name = "mentiuni")
    private String mentiuni;

    @Column(name = "data_creare")
    private Date dataCreare;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "rezervare_centru",
        joinColumns = @JoinColumn(name = "id_rezervare", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "id_centru", referencedColumnName = "id"))
    private Centru centru;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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

    public Integer getNrPersoane() {
        return nrPersoane;
    }

    public void setNrPersoane(Integer nrPersoane) {
        this.nrPersoane = nrPersoane;
    }

    public String getMentiuni() {
        return mentiuni;
    }

    public void setMentiuni(String mentiuni) {
        this.mentiuni = mentiuni;
    }

    public Date getDataCreare() {
        return dataCreare;
    }

    public void setDataCreare(Date dataCreare) {
        this.dataCreare = dataCreare;
    }

    public Centru getCentru() {
        return centru;
    }

    public void setCentru(Centru centru) {
        this.centru = centru;
    }
}
