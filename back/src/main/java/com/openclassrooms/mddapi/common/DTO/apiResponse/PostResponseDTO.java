package com.openclassrooms.mddapi.common.DTO.apiResponse;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostResponseDTO {

    private Long id;

    private String title;

    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private LocalDateTime createdAt;

    private TopicResponseDTO topic;

    private ShortUserResponseDTO author;
}
