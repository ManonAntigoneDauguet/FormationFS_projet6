package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.entity.User;
import com.openclassrooms.mddapi.business.mapper.TopicMapper;
import com.openclassrooms.mddapi.business.mapper.UserMapper;
import com.openclassrooms.mddapi.common.DTO.apiRequest.RegisterRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiRequest.UserUpdateRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.UserResponseDTO;
import com.openclassrooms.mddapi.common.exception.SubscriberException;
import com.openclassrooms.mddapi.configuration.security.UserDetailsImpl;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static java.util.Optional.empty;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    private User user;

    private UserMapper userMapper;

    private RegisterRequestDTO registerRequestDTO;

    private UserUpdateRequestDTO userUpdateRequestDTO;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private UserDetailsImpl userDetails;

    @Mock
    private Authentication authentication;

    private UserService userService;

    @BeforeEach
    void setUp() {
        TopicMapper topicMapper = new TopicMapper();
        userMapper = new UserMapper(topicMapper);
        userService = new UserService(userRepository, userMapper, passwordEncoder);

        user = new User();
        user.setId(1L);
        user.setUsername("username");
        user.setEmail("test@test.fr");
        user.setPassword("password");

        userUpdateRequestDTO = new UserUpdateRequestDTO();
        userUpdateRequestDTO.setEmail("new@test.fr");
        userUpdateRequestDTO.setUsername("newUsername");

        registerRequestDTO = new RegisterRequestDTO();
        registerRequestDTO.setEmail("test@test.fr");
        registerRequestDTO.setPassword("password");
    }

    @DisplayName("Given a new email, when register() is called, then a new user is saved")
    @Test
    void testSuccessRegister() {
        // Given
        Mockito.when(userRepository.findByEmail(registerRequestDTO.getEmail())).thenReturn(Optional.empty());
        // When
        userService.register(registerRequestDTO);
        // Then
        Mockito.verify(userRepository, times(1)).findByEmail(registerRequestDTO.getEmail());
        Mockito.verify(passwordEncoder, times(1)).encode(registerRequestDTO.getPassword());
        Mockito.verify(userRepository, times(1)).save(any(User.class));
    }

    @DisplayName("Given a email already saved, when register() is called, then an error is returned")
    @Test
    void testBadRequestRegister() {
        // Given
        Mockito.when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        // Then
        SubscriberException exception = assertThrows(
                SubscriberException.class,
                () -> userService.register(registerRequestDTO)
        );
        assertNotNull(exception);
        Mockito.verify(userRepository, times(1)).findByEmail(registerRequestDTO.getEmail());
        Mockito.verify(userRepository, times(0)).save(user);
    }

    @DisplayName("Given a user already saved, when updateUser() is called, then the user information is changed")
    @Test
    void testSuccessUpdateUser() {
        // Given
        assertEquals("username", user.getUsername());
        assertEquals("test@test.fr", user.getEmail());
        // When
        userService.updateUser(user, userUpdateRequestDTO);
        // Then
        assertEquals("newUsername", user.getUsername());
        assertEquals("new@test.fr", user.getEmail());
        Mockito.verify(userRepository, times(1)).save(user);
    }

    @DisplayName("Given an authenticated user, when getUserDTOByAuthentication() is called, then the user DTO is returned")
    @Test
    void testSuccessGetUserDTOByAuthentication() {
        // Given
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        Mockito.when(authentication.getPrincipal()).thenReturn(userDetails);
        Mockito.when(userDetails.getEmail()).thenReturn(user.getEmail());
        Mockito.when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        // When
        UserResponseDTO result = userService.getUserDTOByAuthentication();
        // Then
        assertNotNull(result);
        Mockito.verify(securityContext, times(1)).getAuthentication();
        Mockito.verify(authentication, times(1)).getPrincipal();
        Mockito.verify(userDetails, times(1)).getEmail();
        Mockito.verify(userRepository, times(1)).findByEmail(user.getEmail());
    }

    @DisplayName("Given an authenticated user, when getUserDTOByAuthentication() is called, then the user entity is returned")
    @Test
    void testSuccessGetUserEntityByAuthentication() {
        // Given
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        Mockito.when(authentication.getPrincipal()).thenReturn(userDetails);
        Mockito.when(userDetails.getEmail()).thenReturn(user.getEmail());
        Mockito.when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        // When
        User result = userService.getUserEntityByAuthentication();
        // Then
        assertNotNull(result);
        Mockito.verify(securityContext, times(1)).getAuthentication();
        Mockito.verify(authentication, times(1)).getPrincipal();
        Mockito.verify(userDetails, times(1)).getEmail();
        Mockito.verify(userRepository, times(1)).findByEmail(user.getEmail());
    }
}