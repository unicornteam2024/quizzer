package com.example.demo.services;

import com.example.demo.entities.Answer;
import com.example.demo.entities.AnswerHistory;
import com.example.demo.repositories.AnswerHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnswerHistoryService {
    
    @Autowired
    private AnswerHistoryRepository answerHistoryRepository;
    
    @Autowired
    private AnswerService answerService;

    public AnswerHistory saveAnswer(Long answerId) {
        Answer answer = answerService.findById(answerId);
        if (answer == null) {
            throw new IllegalArgumentException("Answer not found with id: " + answerId);
        }

        AnswerHistory history = new AnswerHistory();
        history.setChosenAnswer(answer);
        return answerHistoryRepository.save(history);
    }

    public List<AnswerHistory> getAllAnswerHistory() {
        return answerHistoryRepository.findAllWithQuizDetails();
    }

    public AnswerHistory findById(Long id) {
        return answerHistoryRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Answer history not found with id: " + id));
    }
}
