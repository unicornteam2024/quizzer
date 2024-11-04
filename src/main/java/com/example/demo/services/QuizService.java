package com.example.demo.services;

import com.example.demo.entities.Quiz;
import com.example.demo.repositories.QuizRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    public Quiz createQuiz(Quiz quiz) {
        // Validate quiz details (e.g., title and description should not be empty)
        if (quiz.getTitle() == null || quiz.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Quiz title cannot be empty");
        }
        if (quiz.getDescription() == null || quiz.getDescription().isEmpty()) {
            throw new IllegalArgumentException("Quiz description cannot be empty");
        }

        return quizRepository.save(quiz);
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }


    public void deleteQuiz(Long id) {
        // Check if quiz exists before attempting to delete
        if (!quizRepository.existsById(id)) {
            throw new IllegalArgumentException("Quiz not found with id: " + id);
        }
        
        try {
            quizRepository.deleteById(id);
        } catch (Exception e) {
            // Log the error
            System.err.println("Error deleting quiz with id: " + id);
            throw new RuntimeException("Failed to delete quiz", e);
        }
    }

    public Quiz findQuizById(Long id) {
        Quiz quiz = quizRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid id:" + id));

            return quiz;
    }

    public void saveEditedQuiz(Quiz quiz) {
        quizRepository.save(quiz);
    }

}
