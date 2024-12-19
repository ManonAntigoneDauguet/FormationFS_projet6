package com.openclassrooms.mddapi.common.DTO.apiResponse;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentResponseDTO {

    private Long id;

    private String content;

    private ShortUserResponseDTO author;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private LocalDateTime createdAt;
}
