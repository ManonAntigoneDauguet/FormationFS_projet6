package com.openclassrooms.mddapi.common.DTO.apiResponse;

import lombok.Data;

import java.util.List;

@Data
public class UserResponseDTO {

    private Long id;

    private String username;

    private String email;

    private List<TopicResponseDTO> subscriptions;
}
