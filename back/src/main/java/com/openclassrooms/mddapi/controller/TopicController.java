package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.common.DTO.apiResponse.PostResponseDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.TopicResponseDTO;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.TopicService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class TopicController {

    private final TopicService topicService;

    private final PostService postService;

    public TopicController(TopicService topicService, PostService postService) {
        this.topicService = topicService;
        this.postService = postService;
    }

    @GetMapping("topic")
    @Tag(name = "Topic")
    @Operation(summary = "Get all topics", description = "Get a list of all topics")
    public ResponseEntity<Iterable<TopicResponseDTO>> getTopics() {
        Iterable<TopicResponseDTO> list = topicService.getTopics();
        return ResponseEntity.ok(list);
    }

    @GetMapping("topic/{id}")
    @Tag(name = "Topic")
    @Operation(summary = "Get a specific topic", description = "Get a specific topic")
    public ResponseEntity<TopicResponseDTO> getTopicById(@PathVariable Long id) {
        TopicResponseDTO topic = topicService.getTopicResponseDTOByID(id);
        return ResponseEntity.ok(topic);
    }

    @GetMapping("topic/{id}/post")
    @Tag(name = "Topic")
    @Operation(summary = "Get concerned posts", description = "Gets a list of all posts about a specific topic")
    public ResponseEntity<Iterable<PostResponseDTO>> getPostsByTopic(@PathVariable Long id) {
        Iterable<PostResponseDTO> list = postService.getPostsByTopic(id);
        return ResponseEntity.ok(list);
    }

    @PostMapping("topic/{id}/subscribe")
    @Tag(name = "Topic")
    public ResponseEntity<String> subscribe(@PathVariable final Long id) {
        topicService.subscription(id);
        return ResponseEntity.ok("You're now subscribed !");
    }

    @DeleteMapping("topic/{id}/subscribe")
    @Tag(name = "Topic")
    public ResponseEntity<String> unsubscribe(@PathVariable final Long id) {
        topicService.unsubscribe(id);
        return ResponseEntity.ok("You're now unsubscribed !");
    }
}
