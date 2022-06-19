package com.licenta.alexandraionila.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
    })
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nume", columnDefinition = "TEXT")
    private String nume;

    @Column(name = "prenume", columnDefinition = "TEXT")
    private String prenume;

    @Column(name = "email", columnDefinition = "TEXT")
    private String email;

    @Column(name = "username", columnDefinition = "TEXT")
    private String username;

    @Column(name = "parola", columnDefinition = "TEXT")
    private String parola;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "roluri_useri",
        joinColumns = @JoinColumn(name = "id_user", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "id_rol", referencedColumnName = "id"))
    private Set<Rol> roluri;

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

    public String getPrenume() {
        return prenume;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getParola() {
        return parola;
    }

    public void setParola(String parola) {
        this.parola = parola;
    }

    public Set<Rol> getRoluri() {
        return roluri;
    }

    public void setRoluri(Set<Rol> roluri) {
        this.roluri = roluri;
    }
}
