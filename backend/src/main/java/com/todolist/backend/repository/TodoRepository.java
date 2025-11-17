package com.todolist.backend.repository;



import com.todolist.backend.entity.TodoItem;
import com.todolist.backend.enums.TodoStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<TodoItem, Long> {

    // 根据状态查询
    List<TodoItem> findByStatus(TodoStatus status);

    // 按创建时间倒序查询所有
    List<TodoItem> findAllByOrderByCreatedAtDesc();
}
