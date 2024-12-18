package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.common.DTO.apiResponse.TopicResponseDTO;
import com.openclassrooms.mddapi.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping("topic")
    public ResponseEntity<Iterable<TopicResponseDTO>> getTopics() {
        Iterable<TopicResponseDTO> list = topicService.getTopics();
        return ResponseEntity.of(Optional.ofNullable(list));
    }

    @PostMapping("topic/{id}")
    public ResponseEntity<String> subscribe(@PathVariable final Long id) {
        topicService.subscription(id);
        return ResponseEntity.ok("You're now subscribed !");
    }

    @DeleteMapping("topic/{id}")
    public ResponseEntity<String> unsubscribe(@PathVariable final Long id) {
        topicService.unsubscribe(id);
        return ResponseEntity.ok("You're now unsubscribed !");
    }
}
