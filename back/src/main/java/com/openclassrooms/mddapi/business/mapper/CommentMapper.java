package com.openclassrooms.mddapi.business.mapper;

import com.openclassrooms.mddapi.business.entity.Comment;
import com.openclassrooms.mddapi.common.DTO.apiRequest.CommentRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.CommentResponseDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CommentMapper {

    private final UserMapper userMapper;

    public CommentMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    /**
     * Converts a CommentResponseDTO to a Comment entity
     *
     * @param commentRequestDTO as CommentRequestDTO to convert
     * @return Comment
     */
    public Comment convertToEntity(CommentRequestDTO commentRequestDTO) {
        Comment comment = new Comment();
        comment.setContent(commentRequestDTO.getContent());

        return comment;
    }

    /**
     * Converts a Comment entity to a CommentResponseDTO objet
     *
     * @param comment as the Post to convert
     * @return CommentResponseDTO
     */
    public CommentResponseDTO convertToResponseDTO(Comment comment) {
        CommentResponseDTO responseDTO = new CommentResponseDTO();
        responseDTO.setId(comment.getId());
        responseDTO.setContent(comment.getContent());
        responseDTO.setCreatedAt(comment.getCreatedAt());
        responseDTO.setAuthor(userMapper.convertToShortResponseDTO(comment.getAuthor()));

        return responseDTO;
    }

    public List<CommentResponseDTO> convertAllToResponseDTO(List<Comment> comments) {
        List<CommentResponseDTO> responseDTO = new ArrayList<>();
        for (Comment comment : comments) {
            responseDTO.add(convertToResponseDTO(comment));
        }
        return responseDTO;
    }
}
