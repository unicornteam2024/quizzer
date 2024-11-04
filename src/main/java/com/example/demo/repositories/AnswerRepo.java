package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Answer;

public interface AnswerRepo extends JpaRepository<Answer, Long>{

}
