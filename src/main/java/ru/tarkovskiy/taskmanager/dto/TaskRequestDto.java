package ru.tarkovskiy.taskmanager.dto;

import ru.tarkovskiy.taskmanager.model.TaskPriority;
import ru.tarkovskiy.taskmanager.model.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import jakarta.validation.constraints.NotNull;

public class TaskRequestDto {

    @NotBlank(message = "Название задачи не может быть пустым")
    @Size(min = 3, max = 100,
            message = "Название задачи должно содержать от 3 до 100 символов")
    private String title;

    @Size(max = 1000,
            message = "Описание не должно превышать 1000 символов")
    private String description;

    @NotNull(message = "Укажите статус задачи")
    private TaskStatus status;

    @NotNull(message = "Укажите приоритет задачи")
    private TaskPriority priority;
    private LocalDate deadline;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }
}