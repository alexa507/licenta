package com.licenta.alexandraionila.dtos;

import java.util.List;

public class UserDTO {

    private int id;
    private String username;
    private String nume;
    private String prenume;
    private String email;
    private List<String> roluri;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public List<String> getRoluri() {
        return roluri;
    }

    public void setRoluri(List<String> roluri) {
        this.roluri = roluri;
    }
}
