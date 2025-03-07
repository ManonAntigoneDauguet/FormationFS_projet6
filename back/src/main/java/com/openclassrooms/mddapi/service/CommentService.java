package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.entity.Comment;
import com.openclassrooms.mddapi.business.entity.Post;
import com.openclassrooms.mddapi.business.entity.User;
import com.openclassrooms.mddapi.business.mapper.CommentMapper;
import com.openclassrooms.mddapi.common.DTO.apiRequest.CommentRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.CommentResponseDTO;
import com.openclassrooms.mddapi.repository.CommentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    private final CommentMapper commentMapper;

    private final UserService userService;

    private final PostService postService;

    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper, UserService userService, PostService postService) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.userService = userService;
        this.postService = postService;
    }

    /**
     * Gets all comments of a specified post, ordered by chronology
     *
     * @param id as post id
     * @return Iterable<CommentResponseDTO>
     */
    public Iterable<CommentResponseDTO> getComments(Long id) {
        Post post = postService.getPostEntityByID(id);
        if (post == null) throw new EntityNotFoundException("Post not found");

        return commentMapper.convertAllToResponseDTO(commentRepository.findByPostIdOrderByCreatedAtDesc(id));
    }

    /**
     * Saves the comment on the selected post
     *
     * @param id                as post id
     * @param commentRequestDTO as CommentRequestDTO
     */
    public void saveComment(Long id, CommentRequestDTO commentRequestDTO) {
        User author = userService.getUserEntityByAuthentication();
        Post post = postService.getPostEntityByID(id);

        if (author == null) throw new EntityNotFoundException("User not found");
        if (post == null) throw new EntityNotFoundException("Post not found");

        Comment comment = commentMapper.convertToEntity(commentRequestDTO);
        comment.setAuthor(author);
        comment.setPost(post);
        commentRepository.save(comment);
    }
}
