package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Quiz;
import com.example.demo.entities.Review;
import com.example.demo.repositories.QuizRepository;
import com.example.demo.repositories.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private QuizRepository quizRepository;

    public Review createReview(Review review, Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid quiz id: " + quizId));
        
        review.setQuiz(quiz);
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByQuizId(Long quizId) {
        return reviewRepository.findByQuizId(quizId);
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid review id: " + id));
    }

    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new IllegalArgumentException("Review not found with id: " + id);
        }
        reviewRepository.deleteById(id);
    }

    public Review updateReview(Review review) {
        Review existingReview = reviewRepository.findById(review.getId())
            .orElseThrow(() -> new IllegalArgumentException("Review not found with id: " + review.getId()));
        
        // Preserve quiz relationship
        review.setQuiz(existingReview.getQuiz());
        
        // Update fields
        review.setRating(review.getRating());
        review.setComment(review.getComment());
        review.setStudentName(review.getStudentName());
        review.setCreatedDate(existingReview.getCreatedDate());
        
        return reviewRepository.save(review);
    }
    public Double getAverageRatingByQuizId(Long quizId) {
        return reviewRepository.getAverageRatingByQuizId(quizId);
    }
}