package com.openclassrooms.mddapi.common.DTO.apiRequest;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "An email is required")
    private String email;

    @NotBlank(message = "A password is required")
    private String password;
}
