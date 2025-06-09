package com.veterinaria.veterinaria_back.infrastructure.dto;

public class AuthResponse {
    private String token;
    public AuthResponse(String token) { this.token = token; }
    public String getToken() { return token; }
}
