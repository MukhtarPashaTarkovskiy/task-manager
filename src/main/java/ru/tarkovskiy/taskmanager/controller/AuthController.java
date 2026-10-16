package ru.tarkovskiy.taskmanager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.tarkovskiy.taskmanager.dto.RegisterRequestDto;
import ru.tarkovskiy.taskmanager.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid
            @RequestBody RegisterRequestDto dto) {

        userService.registerUser(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Пользователь зарегистрирован");
    }
}
