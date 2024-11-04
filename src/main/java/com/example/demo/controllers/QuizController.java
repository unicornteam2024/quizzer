package com.example.demo.controllers;

import com.example.demo.entities.Quiz;
import com.example.demo.services.QuizService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        System.out.println("Quiz Added: Title = " + quiz.getTitle() + ", Description = " + quiz.getDescription()
                + ", Status = " + quiz.getStatus());
        return "redirect:/add-quiz";
    }

    /**
     * Handles POST requests to delete a quiz with the specified ID.
     * Deletes the quiz and redirects back to the quiz list.
     *
     * @param id the ID of the quiz to delete
     * @return redirect to the quiz list page
     */
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

    /**
     * Handles GET requests to "/quizzes" and displays a list of all quizzes in the
     * system.
     * Retrieves quizzes from the service layer and passes them to the view through
     * the model.
     *
     * @param model the Model object used to pass quiz list to the view
     * @return the name of the view template "list-quizzes" that displays the quiz
     *         list
     */
    @GetMapping({"/", "/quizzes"})
    public String listQuizzes(Model model) {
        List<Quiz> quizzes = quizService.getAllQuizzes();
        model.addAttribute("quizzes", quizzes);
        return "list-quizzes";
    }
}