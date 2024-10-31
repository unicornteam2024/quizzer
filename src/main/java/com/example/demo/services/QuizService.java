package com.example.demo.services;

import com.example.demo.entities.Quiz;
import com.example.demo.repositories.QuizRepository;
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

        // Save the quiz and return it
        return quizRepository.save(quiz);
    }
}
