package com.example.demo.controllers;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.is;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.example.demo.entities.Answer;
import com.example.demo.entities.Question;
import com.example.demo.entities.Quiz;
import com.example.demo.repositories.AnswerRepository;
import com.example.demo.repositories.QuestionRepository;
import com.example.demo.repositories.QuizRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AnswerRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        answerRepository.deleteAll();
        questionRepository.deleteAll();
        quizRepository.deleteAll();
    }

    @Test
    void createAnswerSavesAnswerForPublishedQuiz() throws Exception {
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

        answerRepository.save(answer1);

        mockMvc.perform(get("/api/questions/" + savedQuestion.getId() + "/answers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].option", is("Option 1")));

        List<Answer> savedAnswers = answerRepository.findAll();
        assertThat(savedAnswers).hasSize(1);
        assertThat(savedAnswers.get(0).getOption()).isEqualTo("Option 1");

    }

    @Test
    void createAnswerDoesNotSaveAnswerWithoutAnswerOption() throws Exception {
        Quiz quiz = new Quiz();
        quiz.setTitle("Published Quiz");
        quiz.setStatus("PUBLISHED");
        Quiz savedQuiz = quizRepository.save(quiz);

        Question question = new Question();
        question.setQuiz(savedQuiz);
        question.setQ_description("Test Question");
        Question savedQuestion = questionRepository.save(question);

        Answer newAnswer = new Answer();
        newAnswer.setOption(null);

        String requestBody = objectMapper.writeValueAsString(newAnswer);

        mockMvc.perform(post("/api/questions/" + savedQuestion.getId() + "/answers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isBadRequest());

        List<Answer> savedAnswers = answerRepository.findAll();
        assertThat(savedAnswers).isEmpty();
    }

    @Test
    void createAnswerDoesNotSaveAnswerForNonExistingQuestion() throws Exception {
        Answer newAnswer = new Answer();
        newAnswer.setOption("Test Option");
        newAnswer.setCorrect(true);

        String requestBody = objectMapper.writeValueAsString(newAnswer);

        mockMvc.perform(post("/api/questions/999/answers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isBadRequest());

        List<Answer> savedAnswers = answerRepository.findAll();
        assertThat(savedAnswers).isEmpty();
    }

    @Test
    void createAnswerDoesNotSaveAnswerForNonPublishedQuiz() throws Exception {
        Quiz quiz = new Quiz();
        quiz.setTitle("Draft Quiz");
        quiz.setStatus("DRAFT");
        Quiz savedQuiz = quizRepository.save(quiz);

        Question question = new Question();
        question.setQuiz(savedQuiz);
        question.setQ_description("Test Question");
        Question savedQuestion = questionRepository.save(question);

        Answer newAnswer = new Answer();
        newAnswer.setOption("Test Option");
        newAnswer.setCorrect(true);

        String requestBody = objectMapper.writeValueAsString(newAnswer);

        mockMvc.perform(post("/api/questions/" + savedQuestion.getId() + "/answers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isBadRequest());

        List<Answer> savedAnswers = answerRepository.findAll();
        assertThat(savedAnswers).isEmpty();
    }
}