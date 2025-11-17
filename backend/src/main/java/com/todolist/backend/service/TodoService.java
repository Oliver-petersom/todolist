package com.todolist.backend.service;



import com.todolist.backend.dto.TodoCreateRequest;
import com.todolist.backend.dto.TodoResponse;
import com.todolist.backend.dto.TodoUpdateRequest;
import com.todolist.backend.enums.TodoCategory;

import java.util.List;

public interface TodoService {

    // 创建任务
    TodoResponse create(TodoCreateRequest request);

    // 获取所有任务
    List<TodoResponse> findAll();

    // 根据 ID 获取任务
    TodoResponse findById(Long id);

    // 更新任务
    TodoResponse update(Long id, TodoUpdateRequest request);

    // 切换任务状态（完成/未完成）
    TodoResponse toggleStatus(Long id);

    // 删除任务
    void delete(Long id);

    // 根据分类查询
    List<TodoResponse> findByCategory(TodoCategory category);
}