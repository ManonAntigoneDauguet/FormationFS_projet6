package com.openclassrooms.mddapi.common.DTO.apiRequest;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PostRequestDTO {

    @NotBlank(message = "A title is required")
    private String title;

    @NotBlank(message = "A content is required")
    private String content;

    @NotNull(message = "A topic id is required")
    @Min(value = 1, message = "A topic id must be greater than 0")
    private Long topicId;
}
