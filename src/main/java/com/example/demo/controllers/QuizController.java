package com.example.demo.controllers;

import com.example.demo.entities.Quiz;
import com.example.demo.services.QuizService;

import jakarta.validation.Valid;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
        System.out.println("Quiz Added: Title = " + quiz.getTitle() + ", Description = " + quiz.getDescription()
                + ", Status = " + quiz.getStatus());
        return "redirect:/add-quiz";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable("id") long id, Model model) {
        Quiz quiz = quizService.findQuizById(id);
        model.addAttribute("quiz", quiz);
        return "edit-quiz";
    }

    @PostMapping("/edit/{id}") 
    public String updateBook(@PathVariable("id") long bookId, @Valid Quiz quiz, BindingResult result, Model model) {
        if (result.hasErrors()) {
            System.out.println("Validation errors occurred: " + result.getAllErrors());
            return "edit-quiz";
        }
        quizService.saveEditedQuiz(quiz);
        return "redirect:/quizzes";
    }

    @PostMapping("/quizzes/delete/{id}")
    public String deleteQuiz(@PathVariable Long id) {
        try {
            quizService.deleteQuiz(id);
            return "redirect:/quizzes";
        } catch (Exception e) {
            // You might want to add error handling here
            return "redirect:/quizzes";
        }
    }

    @GetMapping({"/", "/quizzes"})
    public String listQuizzes(@RequestParam(required = false, defaultValue = "ALL") String status, Model model) {
        List<Quiz> quizzes = quizService.getQuizzesByStatus(status);
        List<String> statuses = Arrays.asList("ALL", "PUBLISHED", "DRAFT");
        
        model.addAttribute("quizzes", quizzes);
        model.addAttribute("selectedStatus", status);
        model.addAttribute("statuses", statuses);
        return "list-quizzes";
    }
}