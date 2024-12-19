package com.openclassrooms.mddapi.common.DTO.apiRequest;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.openclassrooms.mddapi.business.entity.Topic;
import com.openclassrooms.mddapi.business.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PostRequestDTO {

    @NotBlank(message = "A title is required")
    private String title;

    @NotBlank(message = "A content is required")
    private String content;

    @NotBlank(message = "A topic is required")
    private Topic topic;

    @JsonIgnore
    private User author;
}
