package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.entity.User;
import com.openclassrooms.mddapi.business.mapper.UserMapper;
import com.openclassrooms.mddapi.common.DTO.apiRequest.UserRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.UserResponseDTO;
import com.openclassrooms.mddapi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
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
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("PASSWORD = " + passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    /**
     * Finds the user by id
     *
     * @param id as the user id
     * @return UserResponseDTO
     */
    public UserResponseDTO findUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
        return userMapper.convertToResponseDTO(user);
    }
}
