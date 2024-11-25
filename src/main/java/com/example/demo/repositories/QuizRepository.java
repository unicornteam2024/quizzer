package com.example.demo.repositories;

import com.example.demo.entities.Quiz;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query("SELECT q.id AS id, q.title AS title, q.description AS description, q.status AS status, c.name AS categoryName " +
       "FROM Quiz q JOIN q.category c")
    List<Map<String, Object>> findQuizzesWithCategoryNames();

    @Query("SELECT q.id AS id, q.title AS title, q.description AS description, q.status AS status, c.name AS categoryName " +
       "FROM Quiz q JOIN q.category c WHERE q.status = :status")
    List<Map<String, Object>> findQuizzesWithCategoryNamesByStatus(@Param("status") String status);

}
