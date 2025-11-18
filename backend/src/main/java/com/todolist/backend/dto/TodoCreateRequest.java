package com.todolist.backend.dto;

import com.todolist.backend.enums.TodoCategory;
import com.todolist.backend.enums.TodoPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TodoCreateRequest {

    @NotBlank(message = "标题不能为空")
    @Size(min = 1, max = 255, message = "标题长度不能超过255个字符")
    private String title;

    @Size(max = 5000, message = "描述长度不能超过5000个字符")
    private String description;

    // 分类字段，默认 OTHER
    private TodoCategory category;

    // 优先级
    private TodoPriority priority;

    // 截止日期
    private LocalDateTime dueDate;
}