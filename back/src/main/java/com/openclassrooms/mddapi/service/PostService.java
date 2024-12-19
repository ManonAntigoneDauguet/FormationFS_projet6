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
     * Gets all posts ordered by chronology
     *
     * @return Iterable<PostResponseDTO>
     */
    public Iterable<PostResponseDTO> getPosts() {
        return postMapper.convertAllToResponseDTO(postRepository.findByOrderByCreatedAtDesc());
    }

    /**
     * Gets all posts of a specified topic,  ordered by chronology
     *
     * @param id as topic id
     * @return Iterable<PostResponseDTO>
     */
    public Iterable<PostResponseDTO> getPostsByTopic(Long id) {
        return postMapper.convertAllToResponseDTO(postRepository.findByTopicIdOrderByCreatedAtDesc(id));
    }

    /**
     * Gets Post by id
     *
     * @param id as the Post id
     * @return PostResponseDTO
     */
    public PostResponseDTO getPostByID(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Post not found"));
        return postMapper.convertToResponseDTO(post, true);
    }

    /**
     * Saves a new Post
     *
     * @param postRequestDTO as PostRequestDTO
     */
    public void savePost(PostRequestDTO postRequestDTO) {
        User author = userService.getUserEntityByAuthentication();
        Topic topic = topicService.getTopicByID(postRequestDTO.getTopicId());

        Post post = postMapper.convertToEntity(postRequestDTO);
        post.setAuthor(author);
        post.setTopic(topic);
        postRepository.save(post);
    }
}
