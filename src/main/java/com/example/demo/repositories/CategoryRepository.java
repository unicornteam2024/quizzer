package com.example.demo.repositories;

import com.example.demo.entities.Category;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String name);

    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.quizzes WHERE c.id = :id")
    Optional<Category> findByIdWithQuizzes(@Param("id") Long id);

}