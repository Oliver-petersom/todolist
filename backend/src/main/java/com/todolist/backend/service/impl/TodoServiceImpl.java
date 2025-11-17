package com.todolist.backend.service.impl;


import com.todolist.backend.dto.TodoCreateRequest;
import com.todolist.backend.dto.TodoResponse;
import com.todolist.backend.dto.TodoUpdateRequest;
import com.todolist.backend.entity.TodoItem;
import com.todolist.backend.enums.TodoStatus;
import com.todolist.backend.repository.TodoRepository;
import com.todolist.backend.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Override
    @Transactional
    public TodoResponse create(TodoCreateRequest request) {
        TodoItem item = new TodoItem();
        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setStatus(TodoStatus.PENDING);

        TodoItem saved = todoRepository.save(item);
        return convertToResponse(saved);
    }

    @Override
    public List<TodoResponse> findAll() {
        return todoRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TodoResponse findById(Long id) {
        TodoItem item = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("任务不存在: " + id));
        return convertToResponse(item);
    }

    @Override
    @Transactional
    public TodoResponse update(Long id, TodoUpdateRequest request) {
        TodoItem item = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("任务不存在: " + id));

        if (request.getTitle() != null) {
            item.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            item.setDescription(request.getDescription());
        }

        TodoItem updated = todoRepository.save(item);
        return convertToResponse(updated);
    }

    @Override
    @Transactional
    public TodoResponse toggleStatus(Long id) {
        TodoItem item = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("任务不存在: " + id));

        // 切换状态
        item.setStatus(item.getStatus() == TodoStatus.PENDING
                ? TodoStatus.COMPLETED
                : TodoStatus.PENDING);

        TodoItem updated = todoRepository.save(item);
        return convertToResponse(updated);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new RuntimeException("任务不存在: " + id);
        }
        todoRepository.deleteById(id);
    }

    // Entity 转 DTO
    private TodoResponse convertToResponse(TodoItem item) {
        TodoResponse response = new TodoResponse();
        BeanUtils.copyProperties(item, response);
        return response;
    }
}