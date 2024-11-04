package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.example.demo.entities.Question;
import com.example.demo.entities.Quiz;
import com.example.demo.repositories.QuestionRepository;
import com.example.demo.repositories.QuizRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class QuestionController {

    @Autowired
    private QuestionRepository qrepository;
    @Autowired
    private QuizRepository repository;

    @RequestMapping(value = "/quiz/{id}", method = RequestMethod.GET)
    public String viewQuestion(@PathVariable("id") Long id, Model model) {
        Quiz quiz = repository.findById(id).orElse(null);
        List<Question> questions = qrepository.findByQuizId(id);

        model.addAttribute("quiz", quiz);
        model.addAttribute("questions", questions);
        return "questions";
    }

    @RequestMapping(value = "/add-question/{id}", method = RequestMethod.GET)
    public String showForm(@PathVariable("id") Long id, Model model) {
        Question question = new Question();
        Quiz quiz = repository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found"));
        model.addAttribute("quiz", quiz);
        model.addAttribute("question", question);
        return "add-question";
    }

    @RequestMapping(value = "/save-question/{id}", method = RequestMethod.POST)
    public String save(@PathVariable Long id, Question question) {
        Quiz quiz = repository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found"));

        question.setQuiz(quiz);
        question.setId(null);
        qrepository.save(question);

        return "redirect:/quiz/{id}";
    }

    @RequestMapping(value = "/delete-question/{quizId}/{questionId}", method = RequestMethod.POST)
    public String deleteQuestion(@PathVariable Long questionId, @PathVariable Long quizId) {
        qrepository.deleteById(questionId);
        return "redirect:/quiz/" + quizId;
    }

}
