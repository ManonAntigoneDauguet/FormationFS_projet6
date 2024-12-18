package com.openclassrooms.mddapi.common.DTO.apiResponse;

import com.openclassrooms.mddapi.business.entity.Topic;
import lombok.Data;

import java.util.List;

@Data
public class UserResponseDTO {

    private Long id;

    private String username;

    private String email;

    private List<TopicResponseDTO> subscriptions;
}
