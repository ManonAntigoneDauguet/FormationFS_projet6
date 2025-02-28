package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.business.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.topic IN " +
            "(SELECT t FROM User u JOIN u.subscriptions t WHERE u.id = :userId) " +
            "ORDER BY p.createdAt DESC")
    List<Post> findPostsByUserSubscriptions(@Param("userId") Long userId);

}
