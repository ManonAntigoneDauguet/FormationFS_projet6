package com.openclassrooms.mddapi.common.DTO.apiRequest;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserUpdateRequestDTO {

    @NotBlank(message = "A username is required")
    private String username;

    @NotBlank(message = "An email is required")
    @Email(message = "The email must be a correct email address")
    private String email;
}
