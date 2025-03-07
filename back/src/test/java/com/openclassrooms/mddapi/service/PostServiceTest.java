package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.entity.Comment;
import com.openclassrooms.mddapi.business.entity.Post;
import com.openclassrooms.mddapi.business.entity.Topic;
import com.openclassrooms.mddapi.business.entity.User;
import com.openclassrooms.mddapi.business.mapper.PostMapper;
import com.openclassrooms.mddapi.business.mapper.TopicMapper;
import com.openclassrooms.mddapi.business.mapper.UserMapper;
import com.openclassrooms.mddapi.common.DTO.apiRequest.PostRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.PostResponseDTO;
import com.openclassrooms.mddapi.repository.PostRepository;
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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    PostMapper postMapper;

    Topic topic;

    Comment comment;

    List<Comment> commentList;

    User user;

    Post post;

    PostResponseDTO postResponseDTO;

    PostRequestDTO postRequestDTO;

    List<Post> postList;

    @Mock
    PostRepository postRepository;

    @Mock
    private UserService userService;

    @Mock
    private TopicService topicService;

    private PostService postService;

    @BeforeEach
    void setUp() {
        TopicMapper topicMapper = new TopicMapper();
        UserMapper userMapper = new UserMapper(topicMapper);
        postMapper = new PostMapper(topicMapper, userMapper);
        postService = new PostService(postRepository, postMapper, userService, topicService);

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

        topic = new Topic();
        topic.setId(1L);
        topic.setContent("content");
        topic.setName("name");

        post = new Post();
        post.setId(1L);
        post.setTitle("title");
        post.setContent("content");
        post.setAuthor(user);
        post.setComments(commentList);
        post.setTopic(topic);

        postResponseDTO = new PostResponseDTO();
        postResponseDTO.setTitle("title");

        postRequestDTO = new PostRequestDTO();
        postRequestDTO.setTopicId(1L);

        postList = new ArrayList<>();
        postList.add(post);
        postList.add(post);
    }

    @DisplayName("Given a authenticated user, when getPostsBySubscription(), then the topics that the user is subscriber is returned")
    @Test
    void testSuccessGetPostsBySubscription() {
        // Given
        Mockito.when(userService.getUserEntityByAuthentication()).thenReturn(user);
        Mockito.when(postRepository.findPostsByUserSubscriptions(any(Long.class))).thenReturn(postList);
        // When
        Iterable<PostResponseDTO> result = postService.getPostsBySubscription();
        // Then
        assertNotNull(result);
        Mockito.verify(postRepository, times(1)).findPostsByUserSubscriptions(1L);
        List<PostResponseDTO> resultList = (List<PostResponseDTO>) result;
        assertEquals(2, resultList.size());
        assertEquals("username", resultList.get(0).getAuthor().getUsername());
    }

    @DisplayName("Given a post with a X id, when getPostResponseDTOByID(X), then the post DTO is returned")
    @Test
    void testSuccessGetPostResponseDTOByID() {
        // Given
        Mockito.when(postRepository.findById(1L)).thenReturn(Optional.ofNullable(post));
        // When
        PostResponseDTO result = postService.getPostResponseDTOByID(1L);
        // Then
        assertNotNull(result);
        Mockito.verify(postRepository, times(1)).findById((1L));
        assertEquals("username", result.getAuthor().getUsername());
    }

    @DisplayName("Given no post with a X id, when getPostResponseDTOByID(X), then an error is returned")
    @Test
    void testUnfoundGetPostResponseDTOByID() {
        // Given
        Mockito.when(postRepository.findById(1L)).thenReturn(Optional.empty());
        // Then
        EntityNotFoundException exception = assertThrows(
                EntityNotFoundException.class,
                () -> postService.getPostResponseDTOByID(1L)
        );
        assertNotNull(exception);
        Mockito.verify(postRepository, times(1)).findById((1L));
    }

    @DisplayName("Given a post with a X id, when getPostEntityByID(X), then the post entity is returned")
    @Test
    void testSuccessGetPostEntityByID() {
        // Given
        Mockito.when(postRepository.findById(1L)).thenReturn(Optional.ofNullable(post));
        // When
        Post result = postService.getPostEntityByID(1L);
        // Then
        assertNotNull(result);
        Mockito.verify(postRepository, times(1)).findById((1L));
        assertEquals(post, result);
    }

    @DisplayName("Given no post with a X id, when getPostEntityByID(X), then an error is returned")
    @Test
    void testUnfoundGetPostEntityByID() {
        // Given
        Mockito.when(postRepository.findById(1L)).thenReturn(Optional.empty());
        // Then
        EntityNotFoundException exception = assertThrows(
                EntityNotFoundException.class,
                () -> postService.getPostEntityByID(1L)
        );
        assertNotNull(exception);
        Mockito.verify(postRepository, times(1)).findById((1L));
    }

    @DisplayName("Given a topic and an authenticated user, when savePost() is called, then a new post is saved")
    @Test
    void testSuccessSavePost() {
        // Given
        Mockito.when(userService.getUserEntityByAuthentication()).thenReturn(user);
        Mockito.when(topicService.getTopicEntityByID(1L)).thenReturn(topic);
        // When
        postService.savePost(postRequestDTO);
        // Then
        Mockito.verify(userService, times(1)).getUserEntityByAuthentication();
        Mockito.verify(topicService, times(1)).getTopicEntityByID(1L);
        Mockito.verify(postRepository, times(1)).save(any(Post.class));
    }

    @DisplayName("Given a unfound topic, when savePost() is called, then an error is returned")
    @Test
    void testUnfoundSavePost() {
        // Given
        Mockito.when(userService.getUserEntityByAuthentication()).thenReturn(user);
        // Then
        EntityNotFoundException exception = assertThrows(
                EntityNotFoundException.class,
                () -> postService.savePost(new PostRequestDTO())
        );
        assertNotNull(exception);
        Mockito.verify(userService, times(1)).getUserEntityByAuthentication();
        Mockito.verify(postRepository, times(0)).save(any(Post.class));
    }
}