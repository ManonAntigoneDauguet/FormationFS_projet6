package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.business.compositeKey.SubscriptionKey;
import com.openclassrooms.mddapi.business.entity.Subscription;
import com.openclassrooms.mddapi.business.entity.Topic;
import com.openclassrooms.mddapi.business.entity.User;
import com.openclassrooms.mddapi.business.mapper.TopicMapper;
import com.openclassrooms.mddapi.common.DTO.apiResponse.TopicResponseDTO;
import com.openclassrooms.mddapi.common.exception.SubscriberException;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class TopicService {

    private final TopicRepository topicRepository;

    private final SubscriptionRepository subscriptionRepository;

    private final TopicMapper topicMapper;

    private final UserService userService;

    public TopicService(TopicRepository topicRepository, SubscriptionRepository subscriptionRepository, TopicMapper topicMapper, UserService userService) {
        this.topicRepository = topicRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.topicMapper = topicMapper;
        this.userService = userService;
    }

    /**
     * Finds topic by id
     *
     * @param id as topic id
     * @return Topic
     */
    public Topic getTopicByID(Long id) {
        return topicRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Topic not found"));
    }

    /**
     * Gets all topics
     *
     * @return List<TopicResponseDTO>
     */
    public Iterable<TopicResponseDTO> getTopics() {
        return topicMapper.convertAllToResponseDTO(topicRepository.findAll());
    }

    /**
     * Allows the user to subscribe to a topic
     *
     * @param id as topic id
     */
    public void subscription(Long id) {
        User user = userService.getUserEntityByAuthentication();
        Topic topic = getTopicByID(id);
        SubscriptionKey subscriptionKey = new SubscriptionKey(user.getId(), id);

        if (subscriptionRepository.findById(subscriptionKey).isPresent()) {
            throw new SubscriberException("You're already subscriber to this topic");
        }

        Subscription subscription = new Subscription();
        subscription.setId(subscriptionKey);
        subscription.setUser(user);
        subscription.setTopic(topic);
        subscriptionRepository.save(subscription);
    }

    /**
     * Allows the user to unsubscribe to a topic
     *
     * @param id as topic id
     */
    public void unsubscribe(Long id) {
        User user = userService.getUserEntityByAuthentication();
        SubscriptionKey subscriptionKey = new SubscriptionKey(user.getId(), id);

        Subscription subscription = subscriptionRepository.findById(subscriptionKey).orElseThrow(() -> new SubscriberException("You're not subscriber to this topic"));
        subscriptionRepository.delete(subscription);
    }
}
