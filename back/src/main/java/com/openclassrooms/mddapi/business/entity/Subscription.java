package com.openclassrooms.mddapi.business.entity;

import com.openclassrooms.mddapi.business.compositeKey.SubscriptionKey;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="user_topic_subscriptions")
public class Subscription {

    @EmbeddedId
    private SubscriptionKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("topicId")
    @JoinColumn(name = "topic_id")
    private Topic topic;
}
