package ru.tarkovskiy.taskmanager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.tarkovskiy.taskmanager.model.Task;

@Controller
@RequestMapping("/tasks")
public class TaskController {

    @GetMapping
    public String getAllTasks() {
        return "tasks";
    }

    @GetMapping("/new")
    public String showCreateForm(Model model) {
        model.addAttribute("task", new Task());
        return "task-form";
    }

    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Long id) {
        return "task-edit";
    }
}