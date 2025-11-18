package com.todolist.backend.enums;

import lombok.Getter;

@Getter
public enum TodoPriority {
    LOW(0, "低"),
    MEDIUM(1, "中"),
    HIGH(2, "高");

    private final Integer level;
    private final String description;

    TodoPriority(Integer level, String description) {
        this.level = level;
        this.description = description;
    }

}
