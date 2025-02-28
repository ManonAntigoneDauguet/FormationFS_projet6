package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.entity.Post;
import com.openclassrooms.mddapi.business.entity.Topic;
import com.openclassrooms.mddapi.business.entity.User;
import com.openclassrooms.mddapi.business.mapper.PostMapper;
import com.openclassrooms.mddapi.common.DTO.apiRequest.PostRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.PostResponseDTO;
import com.openclassrooms.mddapi.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    private final PostRepository postRepository;

    private final PostMapper postMapper;

    private final UserService userService;

    private final TopicService topicService;

    public PostService(PostRepository postRepository, PostMapper postMapper, UserService userService, TopicService topicService) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.userService = userService;
        this.topicService = topicService;
    }

    /**
     * Gets all posts about topics that the user is subscriber
     *
     * @return Iterable<PostResponseDTO>
     */
    public Iterable<PostResponseDTO> getPostsBySubscription() {
        User subscriber = userService.getUserEntityByAuthentication();
        return postMapper.convertAllToResponseDTO(postRepository.findPostsByUserSubscriptions(subscriber.getId()));
    }

    /**
     * Gets Post by id and return PostResponseDTO
     *
     * @param id as the Post id
     * @return PostResponseDTO
     */
    public PostResponseDTO getPostResponseDTOByID(Long id) {
        return postMapper.convertToResponseDTO(getPostEntityByID(id));
    }

    /**
     * Gets Post by id and return entity
     *
     * @param id as the Post id
     * @return Post
     */
    public Post getPostEntityByID(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Post not found"));
    }

    /**
     * Saves a new Post
     *
     * @param postRequestDTO as PostRequestDTO
     */
    public void savePost(PostRequestDTO postRequestDTO) {
        User author = userService.getUserEntityByAuthentication();
        Topic topic = topicService.getTopicEntityByID(postRequestDTO.getTopicId());

        Post post = postMapper.convertToEntity(postRequestDTO);
        post.setAuthor(author);
        post.setTopic(topic);
        postRepository.save(post);
    }
}
