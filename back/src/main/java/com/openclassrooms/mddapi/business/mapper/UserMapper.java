package com.openclassrooms.mddapi.business.mapper;

import com.openclassrooms.mddapi.business.entity.User;
import com.openclassrooms.mddapi.common.DTO.apiRequest.UserRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.UserResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    private final TopicMapper topicMapper;

    public UserMapper(TopicMapper topicMapper) {
        this.topicMapper = topicMapper;
    }

    /**
     * Converts a UserDTO object to a User object
     *
     * @param userRequestDTO as the UserDTO to convert
     * @return User
     */
    public User convertToEntity(UserRequestDTO userRequestDTO) {
        User user = new User();
        user.setUsername(userRequestDTO.getUsername());
        user.setEmail(userRequestDTO.getEmail());

        return user;
    }

    /**
     * Converts a User object to a UserResponseDTO object
     *
     * @param user as the User to convert
     * @return UserResponseDTO
     */
    public UserResponseDTO convertToResponseDTO(User user) {
        UserResponseDTO responseDTO = new UserResponseDTO();
        responseDTO.setId(user.getId());
        responseDTO.setUsername(user.getUsername());
        responseDTO.setEmail(user.getEmail());
        responseDTO.setSubscriptions(topicMapper.convertAllToResponseDTO(user.getSubscriptions()));

        return responseDTO;
    }
}
