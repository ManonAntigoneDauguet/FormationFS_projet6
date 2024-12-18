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
     * Finds the user by id and return UserResponseDTO
     *
     * @param id as the user id
     * @return UserResponseDTO
     */
    public UserResponseDTO getUserById(Long id) {
        return userMapper.convertToResponseDTO(findUserById(id));
    }

    /**
     * Finds the user by id and return the entity
     *
     * @param id as the user id
     * @return User
     */
    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    /**
     * Finds the user by email and return UserResponseDTO
     *
     * @param email as String
     * @return UserResponseDTO
     */
    public UserResponseDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("User not found"));
        return userMapper.convertToResponseDTO(user);
    }

    /**
     * Finds the user by Authentication and return UserResponseDTO
     *
     * @return UserResponseDTO
     */
    public UserResponseDTO getUserByAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String email = userDetails.getEmail();
        return getUserByEmail(email);
    }
}
