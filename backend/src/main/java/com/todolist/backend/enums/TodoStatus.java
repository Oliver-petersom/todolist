package com.todolist.backend.enums;


import lombok.Getter;

@Getter
public enum TodoStatus {
    PENDING("待完成"),
    COMPLETED("已完成");

    private final String description;

    TodoStatus(String description) {
        this.description = description;
    }

}