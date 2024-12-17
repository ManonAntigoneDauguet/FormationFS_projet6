package com.openclassrooms.mddapi.common.DTO.apiRequest;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRequestDTO {

    @NotBlank(message = "A username is required")
    private String username;

    @NotBlank(message = "An email is required")
    @Email(message = "email must be a correct email address")
    private String email;

    @NotBlank(message = "A password is required")
    @PasswordConstraint(message = "The password must be at least 8 characters long and contain at least 1 special character, 1 uppercase letter and 1 lowercase letter")
    private String password;
}
