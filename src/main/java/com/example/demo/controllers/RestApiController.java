package com.example.demo.controllers;

import com.example.demo.entities.*;
import com.example.demo.services.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

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

    // Error handling
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException e) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException e) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Quiz endpoints
    @GetMapping("/quizzes")
    public ResponseEntity<List<Quiz>> getAllQuizzes(
            @RequestParam(required = false, defaultValue = "ALL") String status) {
        return ResponseEntity.ok(quizService.getQuizzesByStatus(status));
    }

    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.findQuizById(id));
    }

    @PostMapping("/quizzes")
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        Quiz createdQuiz = quizService.createQuiz(quiz);
        return new ResponseEntity<>(createdQuiz, HttpStatus.CREATED);
    }

    @PutMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @RequestBody Quiz quiz) {
        quizService.findQuizById(id);
        quiz.setId(id);
        quizService.saveEditedQuiz(quiz);
        return ResponseEntity.ok(quiz);
    }

    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    // Question endpoints
    @GetMapping("/quizzes/{quizId}/questions")
    public ResponseEntity<List<Question>> getQuizQuestions(@PathVariable Long quizId) {
        return ResponseEntity.ok(questionService.getQuestionsByQuizId(quizId));
    }

    @PostMapping("/quizzes/{quizId}/questions")
    public ResponseEntity<Question> createQuestion(
            @PathVariable Long quizId,
            @RequestBody Question question) {
        Question createdQuestion = questionService.saveQuestion(quizId, question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    // Answer endpoints
    @GetMapping("/questions/{questionId}/answers")
    public ResponseEntity<List<Answer>> getQuestionAnswers(@PathVariable Long questionId) {
        return ResponseEntity.ok(answerService.getAnswersByQuestionId(questionId));
    }

    @PostMapping("/questions/{questionId}/answers")
    public ResponseEntity<Answer> createAnswer(
            @PathVariable Long questionId,
            @RequestParam String option,
            @RequestParam(defaultValue = "false") boolean isCorrect) {
        Answer answer = answerService.saveAnswer(questionId, option, isCorrect);
        return new ResponseEntity<>(answer, HttpStatus.CREATED);
    }

    @DeleteMapping("/answers/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        answerService.deleteAnswer(id);
        return ResponseEntity.noContent().build();
    }

    // Category endpoints
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.findCategoryById(id));
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}