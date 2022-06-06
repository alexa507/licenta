package com.licenta.alexandraionila.entities;

import javax.persistence.*;

@Entity
@Table(name = "roluri")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name="nume")
    private EnumerareRoluri nume;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EnumerareRoluri getNume() {
        return nume;
    }

    public void setNume(EnumerareRoluri nume) {
        this.nume = nume;
    }
}
