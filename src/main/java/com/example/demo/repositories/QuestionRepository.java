package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuizId(Long quizId);

}
