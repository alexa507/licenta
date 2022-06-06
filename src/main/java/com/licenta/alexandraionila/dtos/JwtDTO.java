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
}
