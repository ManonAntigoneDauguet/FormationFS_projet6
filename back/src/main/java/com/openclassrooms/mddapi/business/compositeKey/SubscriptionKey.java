package com.openclassrooms.mddapi.business.compositeKey;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

/**
 * Composite key for the Subscription's id
 */
@Data
@Embeddable
public class SubscriptionKey implements Serializable {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "topic_id")
    private Long topicId;

    public SubscriptionKey() {
    }

    public SubscriptionKey(Long userId, Long topicId) {
        this.userId = userId;
        this.topicId = topicId;
    }

}