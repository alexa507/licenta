package com.licenta.alexandraionila.dtos;

import java.util.Set;

public class InregistrareDTO {

    private String nume;
    private String prenume;
    private String username;
    private String email;
    private String parola;
    private Set<String> rol;

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getParola() {
        return parola;
    }

    public void setParola(String parola) {
        this.parola = parola;
    }

    public Set<String> getRol() {
        return rol;
    }

    public void setRol(Set<String> rol) {
        this.rol = rol;
    }
}
