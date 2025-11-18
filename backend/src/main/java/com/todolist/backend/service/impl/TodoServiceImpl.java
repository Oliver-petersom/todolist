package com.todolist.backend.service.impl;

import com.todolist.backend.dto.TodoCreateRequest;
import com.todolist.backend.dto.TodoResponse;
import com.todolist.backend.dto.TodoUpdateRequest;
import com.todolist.backend.entity.TodoItem;
import com.todolist.backend.enums.TodoCategory;
import com.todolist.backend.enums.TodoPriority;
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

        if (request.getCategory() != null) {
            item.setCategory(request.getCategory());
        } else {
            item.setCategory(TodoCategory.OTHER);
        }

        // 设置优先级
        if (request.getPriority() != null) {
            item.setPriority(request.getPriority());
        } else {
            item.setPriority(TodoPriority.MEDIUM);
        }

        // 设置截止日期
        if (request.getDueDate() != null) {
            item.setDueDate(request.getDueDate());
        }

        TodoItem saved = todoRepository.save(item);
        return convertToResponse(saved);
    }

    @Override
    public List<TodoResponse> findAll(String sortBy) {
        List<TodoItem> items;

        if ("priority".equals(sortBy)) {
            items = todoRepository.findAllOrderByPriority();
        } else if ("dueDate".equals(sortBy)) {
            items = todoRepository.findAllOrderByDueDate();
        } else {
            // 默认按创建时间排序
            items = todoRepository.findAllByOrderByCreatedAtDesc();
        }

        return items.stream()
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
        // 分类
        if (request.getCategory() != null) {
            item.setCategory(request.getCategory());
        }
        // 优先级
        if (request.getPriority() != null) {
            item.setPriority(request.getPriority());
        }
        // 截止日期
        if (request.getDueDate() != null) {
            item.setDueDate(request.getDueDate());
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

    // 根据分类查询
    @Override
    public List<TodoResponse> findByCategory(TodoCategory category, String sortBy) {
        List<TodoItem> items;

        if ("priority".equals(sortBy)) {
            items = todoRepository.findByCategoryOrderByPriority(category);
        } else if ("dueDate".equals(sortBy)) {
            items = todoRepository.findByCategoryOrderByDueDate(category);
        } else {
            // 默认按创建时间排序
            items = todoRepository.findByCategoryOrderByCreatedAtDesc(category);
        }

        return items.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // Entity 转 DTO
    private TodoResponse convertToResponse(TodoItem item) {
        TodoResponse response = new TodoResponse();
        BeanUtils.copyProperties(item, response);
        return response;
    }
}