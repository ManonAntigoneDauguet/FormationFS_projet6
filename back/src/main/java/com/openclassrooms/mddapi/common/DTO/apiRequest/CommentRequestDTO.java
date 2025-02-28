package com.openclassrooms.mddapi.common.DTO.apiRequest;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentRequestDTO {

    @NotBlank(message = "A content is required")
    private String content;

}
