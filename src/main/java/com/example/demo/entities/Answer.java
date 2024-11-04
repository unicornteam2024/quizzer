package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "answers")
public class Answer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Answer option cannot be empty")
    private String option;
    
    @NotNull(message = "isCorrect value must be specified")
    private Boolean isCorrect;
    
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
    
    // Default constructor
    public Answer() {
    }
    
    // Constructor with fields
    public Answer(String option, Boolean isCorrect, Question question) {
        this.option = option;
        this.isCorrect = isCorrect;
        this.question = question;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getOption() {
        return option;
    }
    
    public void setOption(String option) {
        this.option = option;
    }
    
    public Boolean getCorrect() {
        return isCorrect;
    }
    
    public void setCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }
    
    public Question getQuestion() {
        return question;
    }
    
    public void setQuestion(Question question) {
        this.question = question;
    }
    
    
    @Override
    public String toString() {
        return "Answer [id=" + id + 
               ", option=" + option + 
               ", isCorrect=" + isCorrect + 
               ", question=" + (question != null ? question.getId() : "null") + 
               "]";
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Answer)) return false;
        
        Answer answer = (Answer) o;
        return id != null && id.equals(answer.getId());
    }
    
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}