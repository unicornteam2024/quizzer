package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("SELECT q FROM Question q LEFT JOIN FETCH q.answers WHERE q.quiz.id = :quizId AND (:difficulty IS NULL OR :difficulty = 'ALL' OR q.difficulty = :difficulty)")
    List<Question> findByQuizIdAndDifficulty(@Param("quizId") Long quizId, @Param("difficulty") String difficulty);

    @Query("SELECT q FROM Question q LEFT JOIN FETCH q.answers WHERE q.quiz.id = :quizId")
    List<Question> findByQuizId(@Param("quizId") Long quizId);
    
    @Query("SELECT COUNT(q) FROM Question q WHERE q.quiz.id = :quizId")
    long getQuestionCountByQuizId(@Param("quizId") Long quizId);
}