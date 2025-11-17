package com.todolist.backend.dto;


import com.todolist.backend.enums.TodoStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TodoResponse {
    private Long id;
    private String title;
    private String description;
    private TodoStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
