package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Answer;
import com.example.demo.entities.AnswerHistory;
import com.example.demo.entities.Category;
import com.example.demo.entities.Question;
import com.example.demo.entities.Quiz;
import com.example.demo.entities.Review;
import com.example.demo.services.AnswerHistoryService;
import com.example.demo.services.AnswerService;
import com.example.demo.services.CategoryService;
import com.example.demo.services.QuestionService;
import com.example.demo.services.QuizService;
import com.example.demo.services.ReviewService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RestApiController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private AnswerService answerService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AnswerHistoryService answerHistoryService;

    @Autowired
    private ReviewService reviewService;

    // Error handling
    @ExceptionHandler(IllegalArgumentException.class)
    @ApiResponse(responseCode = "400", description = "Bad Request")
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException e) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    // Add logging and standardize the error response.
    @ExceptionHandler(RuntimeException.class)
    @ApiResponse(responseCode = "500", description = "Internal Server Error")
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException e) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Quiz endpoints
    @Tag(name = "Quiz", description = "Operations about quizzes")
    @Operation(summary = "Get all quizzes", description = "Retrieve all quizzes with optional status filter")
    @GetMapping("/quizzes")
    public ResponseEntity<List<Quiz>> getAllQuizzes(
            @Parameter(description = "Filter quizzes by status (ALL, PUBLISHED, DRAFT)") @RequestParam(required = false, defaultValue = "ALL") String status) {
        return ResponseEntity.ok(quizService.getQuizzesByStatus(status));
    }
    // Ensure proper error handling for invalid or non-existent quiz IDs.
    @Tag(name = "Quiz")
    @Operation(summary = "Get quiz by ID", description = "Retrieve a specific quiz by its ID")
    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> getQuizById(
            @Parameter(description = "ID of the quiz to retrieve") @PathVariable Long id) {
        return ResponseEntity.ok(quizService.findQuizById(id));
    }

    @Tag(name = "Quiz")
    @Operation(summary = "Create new quiz", description = "Create a new quiz")
    @PostMapping("/quizzes")
    public ResponseEntity<Quiz> createQuiz(
            @Parameter(description = "Quiz object to create") @RequestBody Quiz quiz) {
        Quiz createdQuiz = quizService.createQuiz(quiz);
        return new ResponseEntity<>(createdQuiz, HttpStatus.CREATED);
    }

    @Tag(name = "Quiz")
    @Operation(summary = "Update quiz", description = "Update an existing quiz")
    @PutMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> updateQuiz(
            @Parameter(description = "ID of the quiz to update") @PathVariable Long id,
            @Parameter(description = "Updated quiz object") @RequestBody Quiz quiz) {
        quizService.findQuizById(id);
        quiz.setId(id);
        quizService.saveEditedQuiz(quiz);
        return ResponseEntity.ok(quiz);
    }

    @Tag(name = "Quiz")
    @Operation(summary = "Delete quiz", description = "Delete a quiz by ID")
    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<Void> deleteQuiz(
            @Parameter(description = "ID of the quiz to delete") @PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    // Question endpoints
    @Tag(name = "Question", description = "Operations about Question")
    @Operation(summary = "Get question by ID", description = "Retrieve a specific question by its ID")
    @GetMapping("/questions/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.findQuestionById(id));
    }
    // Handle exceptions consistently and provide detailed error responses.
    @Tag(name = "Question")
    @Operation(summary = "Get questions by quiz", description = "Retrieve all questions for a specific quiz")
    @GetMapping("/quizzes/{quizId}/questions")
    public ResponseEntity<List<Question>> getQuizQuestions(@PathVariable Long quizId) {
        try {
            // First check if quiz exists
            quizService.findQuizById(quizId);
            return ResponseEntity.ok(questionService.getQuestionsByQuizId(quizId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "Question")
    @Operation(summary = "Create question", description = "Create a new question for a quiz")
    @PostMapping("/quizzes/{quizId}/questions")
    public ResponseEntity<Question> createQuestion(
            @PathVariable Long quizId,
            @RequestBody Question question) {
        Question createdQuestion = questionService.saveQuestion(quizId, question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @Tag(name = "Question")
    @Operation(summary = "Delete question", description = "Delete a question by ID")
    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    // Answer endpoints
    @Tag(name = "Answer", description = "Operations about Answers")
    @Operation(summary = "Get answers for question", description = "Retrieve all answers for a specific question")
    @GetMapping("/questions/{questionId}/answers")
    public ResponseEntity<List<Answer>> getQuestionAnswers(@PathVariable Long questionId) {
        return ResponseEntity.ok(answerService.getAnswersByQuestionId(questionId));
    }

    @Tag(name = "Answer")
    @Operation(summary = "Get answer with question", description = "Retrieve an answer and its associated question")
    @GetMapping("/answers/{answerId}/question")
    public ResponseEntity<Map<String, Object>> getAnswerWithQuestion(@PathVariable Long answerId) {
        Answer answer = answerService.findAnswerById(answerId);
        Question question = answer.getQuestion();
        Map<String, Object> response = new HashMap<>();
        response.put("answer", answer);
        response.put("question", question);
        return ResponseEntity.ok(response);
    }

    @Tag(name = "Answer")
    @Operation(summary = "Get answer by ID", description = "Retrieve a specific answer by its ID")
    @GetMapping("/answers/{id}")
    public ResponseEntity<Answer> getAnswerById(@PathVariable Long id) {
        return ResponseEntity.ok(answerService.findAnswerById(id));
    }

    @Tag(name = "Answer")
    @Operation(summary = "Create answer", description = "Create a new answer for a question")
    @PostMapping("/questions/{questionId}/answers")
    public ResponseEntity<Answer> createAnswer(
            @PathVariable Long questionId,
            @RequestParam String option,
            @RequestParam(defaultValue = "false") boolean isCorrect) {
        Answer answer = answerService.saveAnswer(questionId, option, isCorrect);
        return new ResponseEntity<>(answer, HttpStatus.CREATED);
    }

    @Tag(name = "Answer")
    @Operation(summary = "Delete answer", description = "Delete an answer by ID")
    @DeleteMapping("/answers/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        answerService.deleteAnswer(id);
        return ResponseEntity.noContent().build();
    }

    // Category endpoints
    @Tag(name = "Category", description = "Operations about Categories")
    @Operation(summary = "Get all categories", description = "Retrieve all categories")
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @Tag(name = "Category")
    @Operation(summary = "Get category by ID", description = "Retrieve a specific category by its ID")
    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.findCategoryById(id));
    }

    @Tag(name = "Category")
    @Operation(summary = "Create category", description = "Create a new category")
    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @Tag(name = "Category")
    @Operation(summary = "Delete category", description = "Delete a category by ID")
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(
            @Parameter(description = "ID of the category to delete") @PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    // Answer History endpoints
    @Tag(name = "Answer History", description = "Operations about Answers History")
    @Operation(summary = "Submit answer", description = "Submit an answer and record it in history")
    @PostMapping("/answers/{answerId}/submit")
    public ResponseEntity<AnswerHistory> submitAnswer(@PathVariable Long answerId) {
        try {
            AnswerHistory history = answerHistoryService.saveAnswer(answerId);
            return new ResponseEntity<>(history, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Failed to submit answer: " + e.getMessage());
        }
    }

    @Tag(name = "Answer History")
    @Operation(summary = "Get answer history", description = "Retrieve all answer history")
    @GetMapping("/answer-history")
    public ResponseEntity<List<AnswerHistory>> getAnswerHistory() {
        return ResponseEntity.ok(answerHistoryService.getAllAnswerHistory());
    }

    @Tag(name = "Answer History")
    @Operation(summary = "Get answer history by ID", description = "Retrieve specific answer history by ID")
    @GetMapping("/answer-history/{id}")
    public ResponseEntity<AnswerHistory> getAnswerHistoryById(@PathVariable Long id) {
        return ResponseEntity.ok(answerHistoryService.findById(id));
    }

    @Tag(name = "Review", description = "Operations about Reviews")
    @Operation(summary = "Get quiz reviews with stats", description = "Retrieve all reviews and statistics for a quiz")
    @GetMapping("/quizzes/{quizId}/reviews")
    public ResponseEntity<Map<String, Object>> getQuizReviews(
            @Parameter(description = "ID of the quiz") @PathVariable Long quizId) {
        List<Review> reviews = reviewService.getReviewsByQuizId(quizId);
        Double averageRating = reviewService.getAverageRatingByQuizId(quizId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("reviews", reviews);
        response.put("averageRating", averageRating != null ? averageRating : 0.0);
        response.put("totalReviews", reviews.size());
        
        return ResponseEntity.ok(response);
    }

    @Tag(name = "Review")
    @Operation(summary = "Get quiz review", description = "Retrieve a specific quiz review")
    @GetMapping("/quizzes/{id}/review")
    public ResponseEntity<List<Review>> getReviewsByQuizId(
            @Parameter(description = "ID of the quiz review to retrieve") @PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewsByQuizId(id));
    }

    @Tag(name = "Review")
    @Operation(summary = "Create quiz review", description = "Create a new quiz review")
    @PostMapping("/quizzes/{id}/review")
    public ResponseEntity<Review> createReview(
            @PathVariable("id") Long quizId,
            @RequestBody Review review) {
        Review newReview = reviewService.createReview(review, quizId);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }
    
    @Tag(name = "Review")
    @Operation(summary = "Update review", description = "Update an existing review")
    @PutMapping("/reviews/{id}")
    public ResponseEntity<Review> updateReview(
            @Parameter(description = "ID of the review") @PathVariable Long id,
            @Parameter(description = "Updated review details") @Valid @RequestBody Review review) {
        review.setId(id);
        return ResponseEntity.ok(reviewService.updateReview(review));
    }

    @Tag(name = "Review")
    @Operation(summary = "Delete review", description = "Delete a review")
    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReview(
            @Parameter(description = "ID of the review") @PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    @Tag(name = "Review")
    @Operation(summary = "Get review by ID", description = "Retrieve a specific review by its ID")
    @GetMapping("/reviews/{id}")
    public ResponseEntity<Review> getReviewById(
            @Parameter(description = "ID of the review to retrieve") 
            @PathVariable Long id) {
        try {
            Review review = reviewService.getReviewById(id);
            return ResponseEntity.ok(review);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
}