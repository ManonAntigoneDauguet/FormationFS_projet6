package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.entity.User;
import com.openclassrooms.mddapi.business.mapper.UserMapper;
import com.openclassrooms.mddapi.common.DTO.apiRequest.RegisterRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiRequest.UserUpdateRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.UserResponseDTO;
import com.openclassrooms.mddapi.common.exception.SubscriberException;
import com.openclassrooms.mddapi.configuration.security.UserDetailsImpl;
import com.openclassrooms.mddapi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    /***********************
     * Private methods
     /**********************

     /**
     * Finds the user email by Authentication and return UserResponseDTO
     *
     * @return String an email of the connected user
     */
    private String getUserEmailByAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getEmail();
    }

    /**
     * Finds the user by email and return UserResponseDTO
     *
     * @param email as String
     * @return User
     */
    private User getUserEntityByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    /**
     * Finds the user by email and return UserResponseDTO
     *
     * @param email as String
     * @return UserResponseDTO
     */
    private UserResponseDTO getUserDTOByEmail(String email) {
        return userMapper.convertToResponseDTO(getUserEntityByEmail(email));
    }

    /***********************
     * Public methods
     /**********************

     /**
     * Saves the new user
     *
     * @param registerRequestDTO as the new user to save
     */
    public void register(RegisterRequestDTO registerRequestDTO) {
        if (userRepository.findByEmail(registerRequestDTO.getEmail()).isPresent()) {
            throw new SubscriberException("This email is already saved");
        }

        User user = userMapper.convertToEntity(registerRequestDTO);
        user.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        userRepository.save(user);
    }

    /**
     * Updates user information adn return the information needed to conserve login
     *
     * @param user           as old User
     * @param userUpdateRequestDTO as UserRequestDTO
     */
    public void updateUser(User user, UserUpdateRequestDTO userUpdateRequestDTO) {
        user.setUsername(userUpdateRequestDTO.getUsername());
        user.setEmail(userUpdateRequestDTO.getEmail());
        userRepository.save(user);
    }

    /**
     * Finds the user by Authentication and return UserResponseDTO
     *
     * @return UserResponseDTO
     */
    public UserResponseDTO getUserDTOByAuthentication() {
        return getUserDTOByEmail(getUserEmailByAuthentication());
    }

    /**
     * Finds the user by Authentication and return User
     *
     * @return User
     */
    public User getUserEntityByAuthentication() {
        return getUserEntityByEmail(getUserEmailByAuthentication());
    }
}
