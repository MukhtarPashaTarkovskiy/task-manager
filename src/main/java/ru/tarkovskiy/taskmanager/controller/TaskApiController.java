
package ru.tarkovskiy.taskmanager.controller;

import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.web.bind.annotation.*;
import ru.tarkovskiy.taskmanager.exception.TaskNotFoundException;
import ru.tarkovskiy.taskmanager.service.TaskService;
import ru.tarkovskiy.taskmanager.dto.TaskRequestDto;
import ru.tarkovskiy.taskmanager.model.Task;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.security.core.Authentication;
import ru.tarkovskiy.taskmanager.service.UserService;
import ru.tarkovskiy.taskmanager.model.User;
import jakarta.validation.Valid;
import java.util.List;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;

@RestController
@RequestMapping("/api/tasks")
public class TaskApiController {

    private final TaskService taskService;
    private final UserService userService;

    public TaskApiController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @Parameter(
            name = "X-CSRF-TOKEN",
            in = ParameterIn.HEADER,
            required = true,
            description = "CSRF-токен"
    )
    @PostMapping
    public Task createTask(@Valid @RequestBody TaskRequestDto dto,
                           Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username);
        Task task = new Task(
                dto.getTitle(),
                dto.getDescription(),
                dto.getStatus(),
                dto.getPriority(),
                dto.getDeadline()
        );

        task.setUser(user);

        return taskService.createTask(task);
    }

    @GetMapping("/{id}")
    public Task getTaskById(
            @PathVariable Long id,
            Authentication authentication) {

        String username = authentication.getName();

        return taskService.getTaskByIdAndUsername(id, username);
    }

    @GetMapping
    public List<Task> getAllTasks(Authentication authentication) {
        String username = authentication.getName();
        return taskService.getTasksByUsername(username);
    }

    @Parameter(
            name = "X-CSRF-TOKEN",
            in = ParameterIn.HEADER,
            required = true,
            description = "CSRF-токен"
    )
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,
                           @Valid @RequestBody TaskRequestDto dto,
                           Authentication authentication) {
        Task task = new Task(
                dto.getTitle(),
                dto.getDescription(),
                dto.getStatus(),
                dto.getPriority(),
                dto.getDeadline()
        );

        String username = authentication.getName();

        return taskService.updateTaskByUsername(id, task, username);
    }

    @Parameter(
            name = "X-CSRF-TOKEN",
            in = ParameterIn.HEADER,
            required = true,
            description = "CSRF-токен"
    )
    @DeleteMapping("/{id}")
    public void deleteTask(
            @PathVariable Long id,
            Authentication authentication) {

        String username = authentication.getName();

        taskService.deleteTaskByUsername(id, username);
    }
}

