package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.common.DTO.apiRequest.CommentRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiRequest.PostRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.PostResponseDTO;
import com.openclassrooms.mddapi.service.CommentService;
import com.openclassrooms.mddapi.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostController {

    private final PostService postService;

    private final CommentService commentService;

    public PostController(PostService postService, CommentService commentService) {
        this.postService = postService;
        this.commentService = commentService;
    }

    @GetMapping("post")
    @Tag(name = "Post")
    @Operation(summary = "Get all posts", description = "Get a list of all posts")
    public ResponseEntity<Iterable<PostResponseDTO>> getPosts() {
        Iterable<PostResponseDTO> list = postService.getPosts();
        return ResponseEntity.ok(list);
    }

    @PostMapping("post")
    @Tag(name = "Post")
    @Operation(summary = "Add a post", description = "Add a post")
    public ResponseEntity<String> savePost(@Valid @RequestBody PostRequestDTO postRequestDTO) {
        postService.savePost(postRequestDTO);
        return ResponseEntity.ok("Post correctly sent !");
    }

    @GetMapping("post/{id}")
    @Tag(name = "Post")
    @Operation(summary = "Get a specific post", description = "Get a specific post")
    public ResponseEntity<PostResponseDTO> getPostById(@PathVariable Long id) {
        PostResponseDTO post = postService.getPostResponseDTOByID(id);
        return ResponseEntity.ok(post);
    }

    @PostMapping("post/{id}")
    @Tag(name = "Post")
    @Operation(summary = "Add a comment", description = "Add a comment on a specific post")
    public ResponseEntity<String> saveComment(@PathVariable Long id, @Valid @RequestBody CommentRequestDTO commentRequestDTO) {
        commentService.saveComment(id, commentRequestDTO);
        return ResponseEntity.ok("Comment correctly sent !");
    }
}
