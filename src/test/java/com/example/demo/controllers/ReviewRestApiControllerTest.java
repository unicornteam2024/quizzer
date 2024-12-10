package com.example.demo.controllers;

import java.time.LocalDateTime;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.example.demo.entities.Quiz;
import com.example.demo.entities.Review;
import com.example.demo.repositories.QuizRepository;
import com.example.demo.repositories.ReviewRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ReviewRestApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        reviewRepository.deleteAll();
        quizRepository.deleteAll();
    }

    @Test
    void getQuizReviewsReturnsEmptyListWhenNoReviewsExist() throws Exception {
        Quiz quiz = new Quiz();
        quiz.setTitle("Quiz without reviews");
        quiz.setStatus("PUBLISHED");
        Quiz savedQuiz = quizRepository.save(quiz);

        mockMvc.perform(get("/api/quizzes/" + savedQuiz.getId() + "/reviews"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.reviews", hasSize(0)))
                .andExpect(jsonPath("$.averageRating", is(0.0)))
                .andExpect(jsonPath("$.totalReviews", is(0)));
    }

    @Test
    void getReviewByIdReturnsErrorWhenReviewDoesNotExist() throws Exception {
        mockMvc.perform(get("/reviews/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void createReviewCreatesNewReview() throws Exception {
        Quiz quiz = new Quiz();
        quiz.setTitle("Quiz to review");
        quiz.setStatus("PUBLISHED");
        Quiz savedQuiz = quizRepository.save(quiz);

        String dateTime = "2024-12-04T00:00:00";
        LocalDateTime parsedDateTime = LocalDateTime.parse(dateTime);

        Review review = new Review();
        review.setStudentName("NewUser");
        review.setRating(5);
        review.setComment("Excellent!");
        review.setCreatedDate(parsedDateTime);

        mockMvc.perform(post("/api/quizzes/" + savedQuiz.getId() + "/review")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(review)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.studentName", is("NewUser")))
                .andExpect(jsonPath("$.rating", is(5)))
                .andExpect(jsonPath("$.comment", is("Excellent!")));
    }
}

// ./mvnw test -Dtest=ReviewRestApiControllerTest