package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.business.entity.Subscription;
import com.openclassrooms.mddapi.business.compositeKey.SubscriptionKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, SubscriptionKey> {
}
