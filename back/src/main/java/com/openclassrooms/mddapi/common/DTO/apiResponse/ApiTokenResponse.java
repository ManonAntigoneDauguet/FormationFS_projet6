package com.openclassrooms.mddapi.common.DTO.apiResponse;

import lombok.Data;

@Data
public class ApiTokenResponse {

    private String token;

    public ApiTokenResponse(String token) {
        this.token = token;
    }
}

