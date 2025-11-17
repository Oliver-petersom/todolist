package com.todolist.backend.enums;

import lombok.Getter;

@Getter
public enum TodoCategory {
    WORK("工作"),
    STUDY("学习"),
    LIFE("生活"),
    OTHER("其他");

    private final String description;

    TodoCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
