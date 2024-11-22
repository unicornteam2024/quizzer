package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Question;
import com.example.demo.entities.Quiz;
import com.example.demo.repositories.QuestionRepository;
import com.example.demo.repositories.QuizRepository;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private QuizRepository quizRepository;

    public List<Question> getQuestionsByQuizId(Long quizId) {
        return questionRepository.findByQuizId(quizId);
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
    }

    public Question saveQuestion(Long quizId, Question question) {
        Quiz quiz = getQuizById(quizId);
        question.setQuiz(quiz);
        question.setId(null); // Ensure new question creation
        return questionRepository.save(question);
    }

    public void deleteQuestion(Long questionId) {
        questionRepository.deleteById(questionId);
    }

    public Question findQuestionById(Long id) {
        return questionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }
}