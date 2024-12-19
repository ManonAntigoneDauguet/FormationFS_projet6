package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.business.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByOrderByCreatedAtDesc();

    List<Post> findByTopicIdOrderByCreatedAtDesc(Long topicId);
}
