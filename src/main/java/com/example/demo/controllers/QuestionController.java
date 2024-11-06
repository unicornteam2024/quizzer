package com.example.demo.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Question;
import com.example.demo.entities.Quiz;
import com.example.demo.services.QuestionService;
import com.example.demo.repositories.QuestionRepository;
import com.example.demo.repositories.QuizRepository;

@Controller
public class QuestionController {

    @Autowired
    private QuestionRepository qrepository;
    
    @Autowired
    private QuestionService questionService;
    
    @Autowired
    private QuizRepository repository;

    @RequestMapping(value = "/quizzes/{id}/questions", method = RequestMethod.GET)
    public String viewQuestion(@PathVariable("id") Long id, 
                             @RequestParam(required = false, defaultValue = "ALL") String difficulty,
                             Model model) {
        Quiz quiz = repository.findById(id).orElse(null);
        List<Question> questions = qrepository.findByQuizIdAndDifficulty(id, difficulty);
        List<String> difficulties = Arrays.asList("ALL", "easy", "medium", "difficult");

        model.addAttribute("quiz", quiz);
        model.addAttribute("questions", questions);
        model.addAttribute("difficulties", difficulties);
        model.addAttribute("selectedDifficulty", difficulty);
        return "questions";
    }




    @RequestMapping(value = "/add-question/{id}", method = RequestMethod.GET)
    public String showForm(@PathVariable("id") Long id, Model model) {
        Question question = new Question();
        Quiz quiz = questionService.getQuizById(id);
        model.addAttribute("quiz", quiz);
        model.addAttribute("question", question);
        return "add-question";
    }

    @RequestMapping(value = "/save-question/{id}", method = RequestMethod.POST)
    public String save(@PathVariable Long id, Question question) {
        questionService.saveQuestion(id, question);
        return "redirect:/quizzes/{id}/questions";
    }

    @RequestMapping(value = "/delete-question/{quizId}/{questionId}", method = RequestMethod.POST)
    public String deleteQuestion(@PathVariable Long questionId, @PathVariable Long quizId) {
        questionService.deleteQuestion(questionId);
        return "redirect:/quizzes/" + quizId + "/questions";
    }
}