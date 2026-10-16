package ru.tarkovskiy.taskmanager.service;

import org.springframework.stereotype.Service;
import ru.tarkovskiy.taskmanager.exception.TaskNotFoundException;
import ru.tarkovskiy.taskmanager.repository.TaskRepository;
import ru.tarkovskiy.taskmanager.model.Task;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task getTaskByIdAndUsername(Long id, String username) {
        return taskRepository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new TaskNotFoundException("Task not found: " + id));
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));
        taskRepository.delete(task);
    }

    public Task updateTask(Long id, Task updatedTask) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());
        task.setPriority(updatedTask.getPriority());
        task.setDeadline(updatedTask.getDeadline());

        return taskRepository.save(task);
    }

    public List<Task> getTasksByUsername(String username) {
        return taskRepository.findByUserUsername(username);
    }

    public Task updateTaskByUsername(Long id, Task updatedTask, String username) {

        Task task = getTaskByIdAndUsername(id, username);

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());
        task.setPriority(updatedTask.getPriority());
        task.setDeadline(updatedTask.getDeadline());

        return taskRepository.save(task);
    }

    public void deleteTaskByUsername(Long id, String username) {

        Task task = getTaskByIdAndUsername(id, username);

        taskRepository.delete(task);
    }
}
