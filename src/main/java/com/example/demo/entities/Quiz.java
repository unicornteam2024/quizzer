package com.example.demo.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Size;

@Entity
@JsonPropertyOrder({
    "id", 
    "title", 
    "description",
    "categoryId",
    "categoryName", 
    "createdDate", 
    "status", 
    "questionCount", 
    "questions"
})
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 1)
    private String title;

    @Size(min = 1)
    private String description;

    @Column(nullable = true)
    private String status;

    @Transient
    private long questionCount;

    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "quiz-question")
    private List<Question> questions = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference(value = "category-quiz")
    private Category category;

    // Add these transient fields for category info
    @Transient
    @JsonProperty("categoryId")
    public Long getCategoryId() {
        return category != null ? category.getId() : null;
    }

    @Transient
    @JsonProperty("categoryName")
    public String getCategoryName() {
        return category != null ? category.getName() : null;
    }

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
        if (questions != null) {
            return questions.size();
        }
        return questionCount;
    }

    public void setQuestionCount(long questionCount) {
        this.questionCount = questionCount;
    }

    public List<Question> getQuestions() {
        return questions != null ? questions : new ArrayList<>();
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
        this.questionCount = questions != null ? questions.size() : 0;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

}