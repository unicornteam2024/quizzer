package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByQuizId(Long quizId);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.quiz.id = :quizId")
    Double getAverageRatingByQuizId(@Param("quizId") Long quizId);
}