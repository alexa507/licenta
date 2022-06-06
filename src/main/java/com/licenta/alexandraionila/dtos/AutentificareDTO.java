package com.licenta.alexandraionila.dtos;

public class AutentificareDTO {

    private String username;
    private String parola;

    public String getUsername() {
        return username;
    }

    public void setUsername(String usernameOrEmail) {
        this.username = usernameOrEmail;
    }

    public String getParola() {
        return parola;
    }

    public void setParola(String parola) {
        this.parola = parola;
    }
}
