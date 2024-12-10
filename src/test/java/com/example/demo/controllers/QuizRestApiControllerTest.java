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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.example.demo.entities.Quiz;
import com.example.demo.repositories.AnswerRepository;
import com.example.demo.repositories.QuestionRepository;
import com.example.demo.repositories.QuizRepository;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class QuizRestApiControllerTest {

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
    void getAllQuizzesReturnsEmptyListWhenNoQuizzesExist() throws Exception {
        mockMvc.perform(get("/api/quizzes?status=PUBLISHED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void getAllQuizzesReturnsListOfQuizzesWhenPublishedQuizzesExist() throws Exception {
        Quiz quiz1 = new Quiz();
        quiz1.setTitle("Published Quiz 1");
        quiz1.setStatus("PUBLISHED");

        Quiz quiz2 = new Quiz();
        quiz2.setTitle("Published Quiz 2");
        quiz2.setStatus("PUBLISHED");

        quizRepository.saveAll(List.of(quiz1, quiz2));

        mockMvc.perform(get("/api/quizzes?status=PUBLISHED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].title", is("Published Quiz 1")))
                .andExpect(jsonPath("$[1].title", is("Published Quiz 2")));
    }

    @Test
    void getAllQuizzesDoesNotReturnUnpublishedQuizzes() throws Exception {
        Quiz publishedQuiz = new Quiz();
        publishedQuiz.setTitle("Published Quiz");
        publishedQuiz.setStatus("PUBLISHED");

        Quiz draftQuiz = new Quiz();
        draftQuiz.setTitle("Draft Quiz");
        draftQuiz.setStatus("DRAFT");

        quizRepository.saveAll(List.of(publishedQuiz, draftQuiz));

        mockMvc.perform(get("/api/quizzes?status=PUBLISHED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title", is("Published Quiz")));
    }
}