package com.openclassrooms.mddapi.business.mapper;

import com.openclassrooms.mddapi.business.entity.Topic;
import com.openclassrooms.mddapi.common.DTO.apiResponse.TopicResponseDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TopicMapper {

    /**
     * Converts a Topic object to a TopicResponseDTO object
     *
     * @param topic as the User to convert
     * @return TopicResponseDTO
     */
    public TopicResponseDTO convertToResponseDTO(Topic topic) {
        TopicResponseDTO responseDTO = new TopicResponseDTO();
        responseDTO.setId(topic.getId());
        responseDTO.setName(topic.getName());

        return responseDTO;
    }

    /**
     * Converts a list of Topic to a list of TopicResponseDTO
     *
     * @param topics as a list of Topic
     * @return List<TopicResponseDTO>
     */
    public List<TopicResponseDTO> convertAllToResponseDTO(List<Topic> topics) {
        List<TopicResponseDTO> responseDTO = new ArrayList<>();
        for (Topic topic : topics) {
            responseDTO.add(convertToResponseDTO(topic));
        }
        return responseDTO;
    }
}
