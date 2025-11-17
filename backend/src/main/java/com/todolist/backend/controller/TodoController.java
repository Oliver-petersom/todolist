package com.todolist.backend.controller;

import com.todolist.backend.common.Result;
import com.todolist.backend.dto.TodoCreateRequest;
import com.todolist.backend.dto.TodoResponse;
import com.todolist.backend.dto.TodoUpdateRequest;
import com.todolist.backend.enums.TodoCategory;
import com.todolist.backend.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoService todoService;

    /**
     * 获取所有任务
     */
    @GetMapping
    public Result<List<TodoResponse>> list(
            @RequestParam(required = false) TodoCategory category) {
        List<TodoResponse> todos;
        if (category != null) {
            // 按分类查询
            todos = todoService.findByCategory(category);
        } else {
            // 查询所有
            todos = todoService.findAll();
        }
        return Result.success(todos);
    }

    /**
     * 根据 ID 获取任务
     */
    @GetMapping("/{id}")
    public Result<TodoResponse> getById(@PathVariable Long id) {
        TodoResponse todo = todoService.findById(id);
        return Result.success(todo);
    }

    /**
     * 创建任务
     */
    @PostMapping
    public Result<TodoResponse> create(@Valid @RequestBody TodoCreateRequest request) {
        TodoResponse created = todoService.create(request);
        return Result.success(created);
    }

    /**
     * 更新任务
     */
    @PutMapping("/{id}")
    public Result<TodoResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody TodoUpdateRequest request) {
        TodoResponse updated = todoService.update(id, request);
        return Result.success(updated);
    }

    /**
     * 切换任务状态（完成/未完成）
     */
    @PutMapping("/{id}/toggle")
    public Result<TodoResponse> toggleStatus(@PathVariable Long id) {
        TodoResponse updated = todoService.toggleStatus(id);
        return Result.success(updated);
    }

    /**
     * 删除任务
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        todoService.delete(id);
        return Result.success();
    }
}