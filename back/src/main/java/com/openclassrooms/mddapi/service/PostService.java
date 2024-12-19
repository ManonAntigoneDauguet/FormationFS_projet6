package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.entity.Post;
import com.openclassrooms.mddapi.business.mapper.PostMapper;
import com.openclassrooms.mddapi.common.DTO.apiResponse.PostResponseDTO;
import com.openclassrooms.mddapi.repository.PostRepository;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    private final PostRepository postRepository;

    private final PostMapper postMapper;

    public PostService(PostRepository postRepository, PostMapper postMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
    }

    public Iterable<PostResponseDTO> getPosts() {
        return postMapper.convertAllToResponseDTO(postRepository.findByOrderByCreatedAtDesc());
    }

}
