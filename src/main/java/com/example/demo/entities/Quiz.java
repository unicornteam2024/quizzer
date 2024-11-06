package com.example.demo.entities;
 
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;


@Entity
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status;

    @Transient  // This field won't be persisted in the database
    private long questionCount;

    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;



    // Default constructor
    public Quiz() {
        this.createdDate = LocalDateTime.now();
    }

    // Constructor with parameters
    public Quiz(String title, String description, String status) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.createdDate = LocalDateTime.now();
    }

    //Creating relationship to the question entity
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)
    private List<Question> questions;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    
    public long getQuestionCount() {
        return questionCount;
    }

    public void setQuestionCount(long questionCount) {
        this.questionCount = questionCount;
    }
}
