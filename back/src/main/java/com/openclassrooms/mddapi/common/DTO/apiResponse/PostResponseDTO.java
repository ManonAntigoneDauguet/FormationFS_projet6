package com.openclassrooms.mddapi.common.DTO.apiResponse;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostResponseDTO {

    private Long id;

    private String title;

    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private LocalDateTime createdAt;

    private TopicResponseDTO topic;

    private ShortUserResponseDTO author;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<CommentResponseDTO> comments;
}
