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

import com.example.demo.entities.Category;
import com.example.demo.repositories.CategoryRepository;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class CategoryRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CategoryRepository categoryRepository;

    @BeforeEach
    void setUp() {
        categoryRepository.deleteAll();
    }

    @Test
    void getAllCategoriesReturnsEmptyListWhenNoCategoriesExist() throws Exception {
        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void getAllCategoriesReturnsListOfCategories() throws Exception {
        Category category1 = new Category("Category 1", "Description 1");
        Category category2 = new Category("Category 2", "Description 2");
        categoryRepository.saveAll(List.of(category1, category2));

        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is("Category 1")))
                .andExpect(jsonPath("$[1].name", is("Category 2")));
    }

    @Test
    void getCategoryByIdReturnsCategoryWhenItExists() throws Exception {
        Category category = new Category("Category 1", "Description 1");
        Category savedCategory = categoryRepository.save(category);

        mockMvc.perform(get("/api/categories/" + savedCategory.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Category 1")))
                .andExpect(jsonPath("$.description", is("Description 1")));
    }

    @Test
    void getCategoryByIdReturnsErrorWhenCategoryDoesNotExist() throws Exception {
        mockMvc.perform(get("/api/categories/999"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", is("Category not found with id: 999")));
    }
}
