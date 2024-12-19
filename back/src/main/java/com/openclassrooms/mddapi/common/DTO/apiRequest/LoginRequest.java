package com.openclassrooms.mddapi.common.DTO.apiRequest;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "An email is required")
    @Email(message = "The email must be a correct email address")
    private String email;

    @NotBlank(message = "A password is required")
    private String password;
}
