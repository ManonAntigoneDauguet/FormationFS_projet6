package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.entity.User;
import com.openclassrooms.mddapi.business.mapper.UserMapper;
import com.openclassrooms.mddapi.common.DTO.apiRequest.UserRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.UserResponseDTO;
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
     * Finds the user by id and return the entity
     *
     * @param id as the user id
     * @return User
     */
    private User getUserEntityById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
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
     * @param userRequestDTO as the new user to save
     */
    public void register(UserRequestDTO userRequestDTO) {
        User user = userMapper.convertToEntity(userRequestDTO);
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        userRepository.save(user);
    }

    /**
     * Updates user information adn return the information needed to conserve login
     *
     * @param user           as old User
     * @param userRequestDTO as UserRequestDTO
     */
    public void updateUser(User user, UserRequestDTO userRequestDTO) {
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        user.setUsername(userRequestDTO.getUsername());
        user.setEmail(userRequestDTO.getEmail());
        userRepository.save(user);
    }

    /**
     * Finds the user by id and return UserResponseDTO     // Remove for the prod
     *
     * @param id as the user id
     * @return UserResponseDTO
     */
    public UserResponseDTO getUserDTOById(Long id) {
        return userMapper.convertToResponseDTO(getUserEntityById(id));
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
