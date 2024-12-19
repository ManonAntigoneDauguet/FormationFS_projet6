package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.common.DTO.apiResponse.PostResponseDTO;
import com.openclassrooms.mddapi.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("post")
    public ResponseEntity<Iterable<PostResponseDTO>> getPosts() {
        Iterable<PostResponseDTO> list = postService.getPosts();
        return ResponseEntity.ok(list);
    }
}
