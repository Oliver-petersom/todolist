package com.todolist.backend.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TodoUpdateRequest {

    @Size(min = 1, max = 255, message = "标题长度不能超过255个字符")
    private String title;

    @Size(max = 5000, message = "描述长度不能超过5000个字符")
    private String description;
}
