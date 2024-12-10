package com.example.demo.controllers;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.demo.entities.Answer;
import com.example.demo.entities.Question;
import com.example.demo.entities.Quiz;
import com.example.demo.repositories.AnswerRepository;
import com.example.demo.repositories.QuestionRepository;
import com.example.demo.repositories.QuizRepository;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class QuestionRestApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @BeforeEach
    void setUp() {
        answerRepository.deleteAll();
        questionRepository.deleteAll();
        quizRepository.deleteAll();
    }

    @Test
    void getQuestionsByQuizIdReturnsEmptyListWhenQuizDoesNotHaveQuestions() throws Exception {
        Quiz quiz = new Quiz();
        quiz.setTitle("Quiz without questions");
        quiz.setStatus("PUBLISHED");
        Quiz savedQuiz = quizRepository.save(quiz);

        mockMvc.perform(get("/api/quizzes/" + savedQuiz.getId() + "/questions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void getQuestionsByQuizIdReturnsListOfQuestionsWhenQuizHasQuestions() throws Exception {
        Quiz quiz = new Quiz();
        quiz.setTitle("Quiz with questions");
        quiz.setStatus("PUBLISHED");
        Quiz savedQuiz = quizRepository.save(quiz);

        Question question = new Question();
        question.setQuiz(savedQuiz);
        question.setQ_description("Test question");
        question.setDifficulty("EASY");
        Question savedQuestion = questionRepository.save(question);

        Answer answer1 = new Answer();
        answer1.setQuestion(savedQuestion);
        answer1.setOption("Option 1");
        answer1.setCorrect(true);

        Answer answer2 = new Answer();
        answer2.setQuestion(savedQuestion);
        answer2.setOption("Option 2");
        answer2.setCorrect(false);

        answerRepository.saveAll(List.of(answer1, answer2));

        mockMvc.perform(get("/api/quizzes/" + savedQuiz.getId() + "/questions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].q_description", is("Test question")))
                .andExpect(jsonPath("$[0].answers", hasSize(2)))
                .andExpect(jsonPath("$[0].answers[0].option", is("Option 1")))
                .andExpect(jsonPath("$[0].answers[1].option", is("Option 2")));
    }

    @Test
    void getQuestionsByQuizIdReturnsErrorWhenQuizDoesNotExist() throws Exception {
        mockMvc.perform(get("/api/quizzes/999/questions"))
                .andExpect(status().isNotFound())
                .andExpect(content().string(""));
    }
}
