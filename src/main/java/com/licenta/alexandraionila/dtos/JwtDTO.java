package com.licenta.alexandraionila.dtos;

import java.util.List;

public class JwtDTO {
    private String token;
    private String tip = "Bearer";
    private Integer id;
    private String username;
    private String email;
    private List<String> roluri;

    public JwtDTO(String accessToken, Integer id, String username, String email, List<String> roluri) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roluri = roluri;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public List<String> getRoluri() {
        return roluri;
    }

    public void setRoluri(List<String> roluri) {
        this.roluri = roluri;
    }
}
