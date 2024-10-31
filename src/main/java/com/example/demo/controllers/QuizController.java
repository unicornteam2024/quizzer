package com.example.demo.controllers;

import com.example.demo.entities.Quiz;
import com.example.demo.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

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
}
