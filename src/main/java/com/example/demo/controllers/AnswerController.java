package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entities.Answer;
import com.example.demo.entities.Question;
import com.example.demo.entities.Quiz;
import com.example.demo.services.AnswerService;

@Controller
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @RequestMapping(value = "/save-answer/{questionId}", method = RequestMethod.POST)
    public String saveAnswer(@PathVariable Long questionId,
                           @RequestParam String option,
                           @RequestParam(defaultValue = "false") boolean isCorrect) {
        Answer answer = answerService.saveAnswer(questionId, option, isCorrect);
        Question question = answer.getQuestion();
        return "redirect:/quizzes/" + question.getQuiz().getId() + "/questions";
    }

    @RequestMapping(value = "quizzes/{quizId}/questions/{questionId}/answers", method = RequestMethod.GET)
    public String requestMethodName(@PathVariable("quizId") Long quizId,
                                  @PathVariable("questionId") Long questionId,
                                  Model model) {
        Question question = answerService.getQuestionById(questionId);
        Quiz quiz = answerService.getQuizById(quizId);
        List<Answer> answers = answerService.getAnswersByQuestionId(questionId);

        model.addAttribute("question", question);
        model.addAttribute("quiz", quiz);
        model.addAttribute("answers", answers);
        model.addAttribute("quizId", quizId);

        return "answers";
    }

// Ensure proper error handling and validation for answer deletion.
    @RequestMapping(value = "/delete-answer/{quizId}/{questionId}/{answerId}", method = RequestMethod.POST)
    public String deleteAnswer(@PathVariable Long quizId,
                             @PathVariable Long questionId,
                             @PathVariable Long answerId) {
        answerService.deleteAnswer(answerId);
        return "redirect:/quizzes/" + quizId + "/questions/" + questionId + "/answers";
    }
}