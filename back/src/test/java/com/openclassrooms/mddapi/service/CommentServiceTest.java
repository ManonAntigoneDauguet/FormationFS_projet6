package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.entity.Comment;
import com.openclassrooms.mddapi.business.entity.Post;
import com.openclassrooms.mddapi.business.entity.User;
import com.openclassrooms.mddapi.business.mapper.CommentMapper;
import com.openclassrooms.mddapi.business.mapper.TopicMapper;
import com.openclassrooms.mddapi.business.mapper.UserMapper;
import com.openclassrooms.mddapi.common.DTO.apiRequest.CommentRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.CommentResponseDTO;
import com.openclassrooms.mddapi.repository.CommentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    CommentRequestDTO commentRequestDTO;

    Comment comment;

    List<Comment> commentList;

    User user;

    Post post;

    CommentMapper commentMapper;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private UserService userService;

    @Mock
    private PostService postService;

    private CommentService commentService;

    @BeforeEach
    void setUp() {
        TopicMapper topicMapper = new TopicMapper();
        UserMapper userMapper = new UserMapper(topicMapper);
        commentMapper = new CommentMapper(userMapper);
        commentService = new CommentService(commentRepository, commentMapper, userService, postService);

        user = new User();
        user.setId(1L);
        user.setUsername("username");
        user.setEmail("test@test.fr");
        user.setPassword("password");

        comment = new Comment();
        comment.setId(1L);
        comment.setContent("content");
        comment.setAuthor(user);
        comment.setCreatedAt(LocalDateTime.parse("2025-03-03T11:18:54.652799600"));

        commentList = new ArrayList<>();
        commentList.add(comment);
        commentList.add(comment);

        commentRequestDTO = new CommentRequestDTO();
        commentRequestDTO.setContent("content");

        post = new Post();
        post.setId(1L);
        post.setTitle("title");
        post.setContent("content");
        post.setAuthor(user);
        post.setComments(commentList);
    }

    @DisplayName("Given a post with comments linked, when getComments() is called with the post id, then the comments is returned")
    @Test
    void testSuccessGetComments() {
        // Given
        Mockito.when(postService.getPostEntityByID(1L)).thenReturn(post);
        Mockito.when(commentRepository.findByPostIdOrderByCreatedAtDesc(anyLong())).thenReturn(commentList);
        // When
        Iterable<CommentResponseDTO> result = commentService.getComments(1L);
        // Then
        assertNotNull(result);
        Mockito.verify(commentRepository, times(1)).findByPostIdOrderByCreatedAtDesc(1L);
        List<CommentResponseDTO> resultList = (List<CommentResponseDTO>) result;
        assertEquals(2, resultList.size());
        assertEquals("username", resultList.get(0).getAuthor().getUsername());
    }

    @DisplayName("Given a post with no comments linked, when getComments() is called with the post id, then a empty list is returned")
    @Test
    void testEmptyListGetComments() {
        List<Comment> comments = new ArrayList<>();
        // Given
        Mockito.when(postService.getPostEntityByID(1L)).thenReturn(post);
        Mockito.when(commentRepository.findByPostIdOrderByCreatedAtDesc(anyLong())).thenReturn(comments);
        // When
        Iterable<CommentResponseDTO> result = commentService.getComments(1L);
        // Then
        assertNotNull(result);
        Mockito.verify(commentRepository, times(1)).findByPostIdOrderByCreatedAtDesc(1L);
        List<CommentResponseDTO> resultList = (List<CommentResponseDTO>) result;
        assertEquals(0, resultList.size());
    }

    @DisplayName("Given no post with a X id, when getComments(X) is called, then an error is returned")
    @Test
    void testUnfoundGetComments() {
        List<Comment> comments = new ArrayList<>();
        // Given
        Mockito.when(postService.getPostEntityByID(1L)).thenReturn(null);
        // When
        EntityNotFoundException exception = assertThrows(
                EntityNotFoundException.class,
                () -> commentService.getComments(1L)
        );
        // Then
        assertNotNull(exception);
        Mockito.verify(postService, times(1)).getPostEntityByID(1L);
    }

    @DisplayName("Given a post and an authenticated user, when saveComment() is called, then a new comment is saved")
    @Test
    void testSuccessSaveComments() {
        // Given
        Mockito.when(userService.getUserEntityByAuthentication()).thenReturn(user);
        Mockito.when(postService.getPostEntityByID(1L)).thenReturn(post);
        // When
        commentService.saveComment(1L, commentRequestDTO);
        // Then
        Mockito.verify(postService, times(1)).getPostEntityByID(1L);
        Mockito.verify(userService, times(1)).getUserEntityByAuthentication();
        Mockito.verify(commentRepository, times(1)).save(Mockito.any(Comment.class));
    }

    @DisplayName("Given a unfound post, when saveComment() is called, then an error is returned")
    @Test
    void testUnfoundSaveComments() {
        // Given
        Mockito.when(userService.getUserEntityByAuthentication()).thenReturn(user);
        // Then
        EntityNotFoundException exception = assertThrows(
                EntityNotFoundException.class,
                () -> commentService.saveComment(1L, commentRequestDTO)
        );
        assertNotNull(exception);
        Mockito.verify(commentRepository, times(0)).save(Mockito.any(Comment.class));
    }
}