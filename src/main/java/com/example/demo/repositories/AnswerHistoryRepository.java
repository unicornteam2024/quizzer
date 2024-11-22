package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.AnswerHistory;

@Repository
public interface AnswerHistoryRepository extends JpaRepository<AnswerHistory, Long> {
    @Query("SELECT ah FROM AnswerHistory ah " +
           "JOIN FETCH ah.chosenAnswer a " +
           "JOIN FETCH a.question q " +
           "JOIN FETCH q.quiz")
    List<AnswerHistory> findAllWithQuizDetails();
}