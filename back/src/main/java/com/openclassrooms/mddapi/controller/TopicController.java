package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.common.DTO.apiResponse.PostResponseDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.TopicResponseDTO;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.TopicService;
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
    public ResponseEntity<Iterable<TopicResponseDTO>> getTopics() {
        Iterable<TopicResponseDTO> list = topicService.getTopics();
        return ResponseEntity.ok(list);
    }

    @PostMapping("topic/{id}/subscribe")
    public ResponseEntity<String> subscribe(@PathVariable final Long id) {
        topicService.subscription(id);
        return ResponseEntity.ok("You're now subscribed !");
    }

    @DeleteMapping("topic/{id}/subscribe")
    public ResponseEntity<String> unsubscribe(@PathVariable final Long id) {
        topicService.unsubscribe(id);
        return ResponseEntity.ok("You're now unsubscribed !");
    }

    @GetMapping("topic/{id}/post")
    public ResponseEntity<Iterable<PostResponseDTO>> getTopicsByTopic(@PathVariable Long id) {
        Iterable<PostResponseDTO> list = postService.getPostsByTopic(id);
        return ResponseEntity.ok(list);
    }
}
