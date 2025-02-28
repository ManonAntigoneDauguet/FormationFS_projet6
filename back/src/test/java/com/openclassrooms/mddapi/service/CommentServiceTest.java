package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.mapper.CommentMapper;
import com.openclassrooms.mddapi.business.mapper.UserMapper;
import com.openclassrooms.mddapi.common.DTO.apiResponse.CommentResponseDTO;
import com.openclassrooms.mddapi.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    private CommentMapper commentMapper;

    @Mock
    private UserService userService;

    @Mock
    private PostService postService;

    private CommentService commentService;

    @BeforeEach
    void setUp() {
        commentMapper = new CommentMapper(Mockito.mock(UserMapper.class));
        commentService = new CommentService(commentRepository, commentMapper, userService, postService);
    }

    @DisplayName("Given, when, then")
    @Test
    void testSuccessGetComment() {
        // Given
        Mockito.when(commentRepository.findByPostIdOrderByCreatedAtDesc(anyLong()));
        // When
        CommentResponseDTO result = (CommentResponseDTO) commentService.getComments(1L);
        // Then
        assertNotNull(result);

    }
}