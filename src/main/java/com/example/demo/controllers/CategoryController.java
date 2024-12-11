package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.entities.Category;
import com.example.demo.services.CategoryService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    // Ensure proper validation and error handling for category retrieval and form display.
    @GetMapping("/add-category")
    public String showAddCategoryForm() {
        return "add-category";
    }

    @GetMapping("/categories")
    public String listCategories(Model model) {
        List<Category> categories = categoryService.getAllCategories();
        model.addAttribute("categories", categories);
        return "list-categories";
    }

    @PostMapping("/add-category")
    public String addCategory(@ModelAttribute Category category, RedirectAttributes redirectAttributes) {
        try {
            categoryService.createCategory(category);
            redirectAttributes.addFlashAttribute("success", "Category added successfully!");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/categories";
    }

    // @PostMapping("/categories/delete/{id}")
    // public String deleteCategory(@PathVariable("id") Long id, Model model) {
    // try {
    // categoryService.deleteCategory(id);
    // model.addAttribute("successMessage", "Category deleted successfully");

    // } catch (IllegalArgumentException e) {
    // model.addAttribute("errorMessage", e.getMessage());
    // } catch (IllegalStateException e) {
    // model.addAttribute("errorMessage", e.getMessage());
    // } catch (Exception e) {
    // model.addAttribute("errorMessage", "An unexpected error occurred while
    // deleting the category.");
    // }
    // return "redirect:/categories";
    // }
    // Consolidate exception handling and ensure proper logging.
    @PostMapping("/categories/delete/{id}")
    public String deleteCategory(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        try {
            categoryService.deleteCategory(id);
            redirectAttributes.addFlashAttribute("successMessage", "Category deleted successfully");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
        } catch (IllegalStateException e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage",
                    "An unexpected error occurred while deleting the category.");
        }
        return "redirect:/categories";
    }

}
