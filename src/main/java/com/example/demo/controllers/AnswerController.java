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
import com.example.demo.repositories.AnswerRepository;
import com.example.demo.repositories.QuestionRepository;

@Controller
public class AnswerController {

    @Autowired
    private QuestionRepository qrepository;

    @Autowired
    private AnswerRepository answerRepository;

    @RequestMapping(value = "/save-answer/{questionId}", method = RequestMethod.POST)
    public String saveAnswer(@PathVariable Long questionId,
                            @RequestParam String option,
                            @RequestParam(defaultValue = "false") boolean isCorrect) {
        Question question = qrepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        Answer answer = new Answer();
        answer.setOption(option);
        answer.setCorrect(isCorrect);
        answer.setQuestion(question);
        
        answerRepository.save(answer);
        
        return "redirect:/quizzes/" + question.getQuiz().getId() + "/questions";
    }

    @RequestMapping(value = "quizzes/{quizId}/questions/{questionId}/answers", method=RequestMethod.GET)
    public String requestMethodName(@PathVariable("quizId") Long quizId, @PathVariable("questionId") Long questionId, Model model) {
        Question question = qrepository.findById(questionId)
        .orElseThrow(() -> new RuntimeException("Question not found"));

        List<Answer> answers = answerRepository.findByQuestionId(questionId);

        model.addAttribute("question", question);
        model.addAttribute("answers", answers);
        model.addAttribute("quizId", quizId);

        return "answers";
    }
}
