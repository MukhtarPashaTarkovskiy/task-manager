package ru.tarkovskiy.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.tarkovskiy.taskmanager.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserUsername(String username);
    Optional<Task> findByIdAndUserUsername(Long id, String username);
    long deleteByUserUsername(String username);
}
