package com.example.demo.controllers;

import com.example.demo.entities.Quiz;
import com.example.demo.services.QuizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/add-quiz")
    public String showAddQuizForm(Model model) {
        model.addAttribute("quiz", new Quiz());
        return "add-quiz";
    }

    @PostMapping("/quizzes")
    public String createQuiz(Quiz quiz) {
        quizService.createQuiz(quiz);
        System.out.println("Quiz Added: Title = " + quiz.getTitle() + ", Description = " + quiz.getDescription() + ", Status = " + quiz.getStatus());
        return "redirect:/add-quiz";
    }

    @DeleteMapping("/quizzes/{id}")
    @ResponseBody  // Return the response body directly (tells Spring to write the return value directly to the response body)
    public ResponseEntity<?> deleteQuiz(@PathVariable Long id) { // Extracts the quiz ID from the URL
        try {
            quizService.deleteQuiz(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (IllegalArgumentException e) {
            // This will be thrown by the service if quiz is not found
            return ResponseEntity.notFound().build(); // 404 Not Found
        } catch (Exception e) {
            // Handle any other unexpected errors
            return ResponseEntity.internalServerError().build(); // 500 Internal Server Error
        }
    }
}
