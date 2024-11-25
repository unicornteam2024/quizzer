package com.example.demo.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Quiz;
import com.example.demo.repositories.QuestionRepository;
import com.example.demo.repositories.QuizRepository;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Quiz createQuiz(Quiz quiz) {
        if (quiz.getTitle() == null || quiz.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Quiz title cannot be empty");
        }
        if (quiz.getDescription() == null || quiz.getDescription().isEmpty()) {
            throw new IllegalArgumentException("Quiz description cannot be empty");
        }

        if (quiz.getStatus() == null || quiz.getStatus().isEmpty()) {
            quiz.setStatus("Draft");
        }

        Quiz savedQuiz = quizRepository.save(quiz);
        savedQuiz.setQuestionCount(savedQuiz.getQuestions().size()); // Set question count after saving
        return savedQuiz;
    }

    public List<Quiz> getAllQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        quizzes.forEach(quiz -> quiz.setQuestionCount(quiz.getQuestions().size()));
        return quizzes;
    }

    public Quiz findQuizById(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid id:" + id));
        quiz.setQuestionCount(quiz.getQuestions().size());
        return quiz;
    }

    public List<Quiz> getQuizzesByStatus(String status) {
        List<Quiz> quizzes;
        if (status == null || status.equals("ALL")) {
            quizzes = quizRepository.findAll();
        } else {
            quizzes = quizRepository.findAll().stream()
                    .filter(quiz -> quiz.getStatus().equalsIgnoreCase(status))
                    .collect(Collectors.toList());
        }

        // Set question count for each quiz
        quizzes.forEach(quiz -> quiz.setQuestionCount(quiz.getQuestions().size()));

        return quizzes;
    }

    public List<Map<String, Object>> getQuizzesWithCategoryNamesByStatus(String status) {
        List<Map<String, Object>> quizzes;

        if ("ALL".equalsIgnoreCase(status)) {
            quizzes = quizRepository.findQuizzesWithCategoryNames();
        } else {
            quizzes = quizRepository.findQuizzesWithCategoryNamesByStatus(status);
        }

        List<Map<String, Object>> mutableQuizzes = new ArrayList<>();
        for (Map<String, Object> quiz : quizzes) {
            Map<String, Object> mutableQuiz = new HashMap<>(quiz);
            Long quizId = (Long) quiz.get("id");
            Quiz fullQuiz = quizRepository.findById(quizId).orElse(null);
            if (fullQuiz != null) {
                mutableQuiz.put("questionCount", fullQuiz.getQuestions().size());
            }
            mutableQuizzes.add(mutableQuiz);
        }

        return mutableQuizzes;
    }

    public void deleteQuiz(Long id) {
        if (!quizRepository.existsById(id)) {
            throw new IllegalArgumentException("Quiz not found with id: " + id);
        }

        try {
            quizRepository.deleteById(id);
        } catch (Exception e) {
            System.err.println("Error deleting quiz with id: " + id);
            throw new RuntimeException("Failed to delete quiz", e);
        }
    }

    public Quiz saveEditedQuiz(Quiz quiz) {
        Quiz savedQuiz = quizRepository.save(quiz);
        savedQuiz.setQuestionCount(savedQuiz.getQuestions().size());
        return savedQuiz;
    }
}