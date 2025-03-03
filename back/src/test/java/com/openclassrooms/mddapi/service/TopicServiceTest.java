package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.compositeKey.SubscriptionKey;
import com.openclassrooms.mddapi.business.entity.*;
import com.openclassrooms.mddapi.business.mapper.TopicMapper;
import com.openclassrooms.mddapi.common.DTO.apiRequest.PostRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.CommentResponseDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.PostResponseDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.TopicResponseDTO;
import com.openclassrooms.mddapi.common.exception.SubscriberException;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class TopicServiceTest {

    TopicMapper topicMapper;

    Topic topic;

    Comment comment;

    List<Comment> commentList;

    User user;

    Post post;

    PostResponseDTO postResponseDTO;

    PostRequestDTO postRequestDTO;

    List<Post> postList;

    @Mock
    TopicRepository topicRepository;

    @Mock
    SubscriptionRepository subscriptionRepository;

    @Mock
    private UserService userService;

    private TopicService topicService;

    @BeforeEach
    void setUp() {
        topicMapper = new TopicMapper();
        topicService = new TopicService(topicRepository, subscriptionRepository, topicMapper, userService);

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

    @DisplayName("Given a topic with a X id, when getTopicEntityByID(X), then the topic entity is returned")
    @Test
    void testSuccessGetTopicEntityByID() {
        // Given
        Mockito.when(topicRepository.findById(1L)).thenReturn(Optional.ofNullable(topic));
        // When
        Topic result = topicService.getTopicEntityByID(1L);
        // Then
        assertNotNull(result);
        Mockito.verify(topicRepository, times(1)).findById((1L));
        assertEquals(topic, result);
    }

    @DisplayName("Given no topic with a X id, when getTopicEntityByID(X), then an error is returned")
    @Test
    void testUnfoundGetPostEntityByID() {
        // Given
        Mockito.when(topicRepository.findById(1L)).thenReturn(Optional.empty());
        // Then
        EntityNotFoundException exception = assertThrows(
                EntityNotFoundException.class,
                () -> topicService.getTopicEntityByID(1L)
        );
        assertNotNull(exception);
        Mockito.verify(topicRepository, times(1)).findById((1L));
    }

    @DisplayName("Given topics, when getTopics() is called with the post id, then a list of topic DTO is returned")
    @Test
    void testSuccessGetTopics() {
        List<Topic> topics = new ArrayList<>();
        topics.add(topic);
        topics.add(topic);
        // Given
        Mockito.when(topicRepository.findAll()).thenReturn(topics);
        // When
        Iterable<TopicResponseDTO> result = topicService.getTopics();
        // Then
        assertNotNull(result);
        Mockito.verify(topicRepository, times(1)).findAll();
        List<TopicResponseDTO> resultList = (List<TopicResponseDTO>) result;
        assertEquals(2, resultList.size());
    }

    @DisplayName("Given an authenticated user who is not subscriber of a X topic, when subscription(X) is called, then the user is now subscriber")
    @Test
    void testSuccessSubscription() {
        // Given
        Mockito.when(userService.getUserEntityByAuthentication()).thenReturn(user);
        Mockito.when(topicRepository.findById(1L)).thenReturn(Optional.ofNullable(topic));
        Mockito.when(subscriptionRepository.findById(any(SubscriptionKey.class))).thenReturn(Optional.empty());
        // When
        topicService.subscription(1L);
        // Then
        Mockito.verify(subscriptionRepository, times(1)).save(any(Subscription.class));
        Mockito.verify(userService, times(1)).getUserEntityByAuthentication();
        Mockito.verify(topicRepository, times(1)).findById(1L);
        Mockito.verify(subscriptionRepository, times(1)).findById(any(SubscriptionKey.class));
    }

    @DisplayName("Given an authenticated user who is already subscriber of a X topic, when subscription(X) is called, then an error is returned")
    @Test
    void testBadRequestSubscription() {
        // Given
        Mockito.when(userService.getUserEntityByAuthentication()).thenReturn(user);
        Mockito.when(topicRepository.findById(1L)).thenReturn(Optional.ofNullable(topic));
        Mockito.when(subscriptionRepository.findById(any(SubscriptionKey.class))).thenReturn(Optional.of(new Subscription()));
        // Then
        SubscriberException exception = assertThrows(
                SubscriberException.class,
                () -> topicService.subscription(1L)
        );
        assertNotNull(exception);
        Mockito.verify(subscriptionRepository, times(0)).save(any(Subscription.class));
        Mockito.verify(userService, times(1)).getUserEntityByAuthentication();
        Mockito.verify(topicRepository, times(1)).findById(1L);
        Mockito.verify(subscriptionRepository, times(1)).findById(any(SubscriptionKey.class));
    }

    @DisplayName("Given an authenticated user who is subscriber of a X topic, when unsubscribe(X) is called, then the user is no longer subscriber")
    @Test
    void testSuccessUnsubscribe() {
        // Given
        Mockito.when(userService.getUserEntityByAuthentication()).thenReturn(user);
        Mockito.when(subscriptionRepository.findById(any(SubscriptionKey.class))).thenReturn(Optional.of(new Subscription()));
        // When
        topicService.unsubscribe(1L);
        // Then
        Mockito.verify(subscriptionRepository, times(1)).delete(any(Subscription.class));
        Mockito.verify(userService, times(1)).getUserEntityByAuthentication();
        Mockito.verify(subscriptionRepository, times(1)).findById(any(SubscriptionKey.class));
    }

    @DisplayName("Given an authenticated user who is not subscriber of a X topic, when unsubscribe(X) is called, then an error is returned")
    @Test
    void testBadRequestUnsubscribe() {
        // Given
        Mockito.when(userService.getUserEntityByAuthentication()).thenReturn(user);
        Mockito.when(subscriptionRepository.findById(any(SubscriptionKey.class))).thenReturn(Optional.empty());
        // Then
        SubscriberException exception = assertThrows(
                SubscriberException.class,
                () -> topicService.unsubscribe(1L)
        );
        assertNotNull(exception);
        Mockito.verify(subscriptionRepository, times(0)).save(any(Subscription.class));
        Mockito.verify(userService, times(1)).getUserEntityByAuthentication();
        Mockito.verify(subscriptionRepository, times(1)).findById(any(SubscriptionKey.class));
    }
}