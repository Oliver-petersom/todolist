package com.todolist.backend.repository;

import com.todolist.backend.entity.TodoItem;
import com.todolist.backend.enums.TodoCategory;
import com.todolist.backend.enums.TodoStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<TodoItem, Long> {

    // 根据状态查询
    List<TodoItem> findByStatus(TodoStatus status);

    // 按创建时间倒序查询所有
    List<TodoItem> findAllByOrderByCreatedAtDesc();

    // 根据分类查询
    List<TodoItem> findByCategoryOrderByCreatedAtDesc(TodoCategory category);

    // 根据分类和状态查询
    List<TodoItem> findByCategoryAndStatusOrderByCreatedAtDesc(TodoCategory category, TodoStatus status);

    // 按优先级排序
    @Query("SELECT t FROM TodoItem t ORDER BY " +
            "CASE t.priority " +
            "WHEN com.todolist.backend.enums.TodoPriority.HIGH THEN 0 " +
            "WHEN com.todolist.backend.enums.TodoPriority.MEDIUM THEN 1 " +
            "WHEN com.todolist.backend.enums.TodoPriority.LOW THEN 2 " +
            "END, t.createdAt DESC")
    List<TodoItem> findAllOrderByPriority();

    // 按截止日期排序
    @Query("SELECT t FROM TodoItem t ORDER BY " +
            "CASE WHEN t.dueDate IS NULL THEN 1 ELSE 0 END, " +
            "t.dueDate ASC, t.createdAt DESC")
    List<TodoItem> findAllOrderByDueDate();

    // 按分类查询并按优先级排序
    @Query("SELECT t FROM TodoItem t WHERE t.category = ?1 ORDER BY " +
            "CASE t.priority " +
            "WHEN com.todolist.backend.enums.TodoPriority.HIGH THEN 0 " +
            "WHEN com.todolist.backend.enums.TodoPriority.MEDIUM THEN 1 " +
            "WHEN com.todolist.backend.enums.TodoPriority.LOW THEN 2 " +
            "END, t.createdAt DESC")
    List<TodoItem> findByCategoryOrderByPriority(TodoCategory category);

    // 按分类查询并按截止日期排序
    @Query("SELECT t FROM TodoItem t WHERE t.category = ?1 ORDER BY " +
            "CASE WHEN t.dueDate IS NULL THEN 1 ELSE 0 END, " +
            "t.dueDate ASC, t.createdAt DESC")
    List<TodoItem> findByCategoryOrderByDueDate(TodoCategory category);

    // 搜索任务（标题或描述包含关键词） 使用 LOWER 函数实现不区分大小写搜索
    @Query("SELECT t FROM TodoItem t WHERE " +
            "LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "ORDER BY t.createdAt DESC")
    List<TodoItem> searchByKeyword(@Param("keyword") String keyword);

    // 搜索任务并按优先级排序
    @Query("SELECT t FROM TodoItem t WHERE " +
            "LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "ORDER BY " +
            "CASE t.priority " +
            "WHEN com.todolist.backend.enums.TodoPriority.HIGH THEN 0 " +
            "WHEN com.todolist.backend.enums.TodoPriority.MEDIUM THEN 1 " +
            "WHEN com.todolist.backend.enums.TodoPriority.LOW THEN 2 " +
            "END, t.createdAt DESC")
    List<TodoItem> searchByKeywordOrderByPriority(@Param("keyword") String keyword);

    // 搜索任务并按截止日期排序
    @Query("SELECT t FROM TodoItem t WHERE " +
            "LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "ORDER BY " +
            "CASE WHEN t.dueDate IS NULL THEN 1 ELSE 0 END, " +
            "t.dueDate ASC, t.createdAt DESC")
    List<TodoItem> searchByKeywordOrderByDueDate(@Param("keyword") String keyword);

    // 按分类搜索任务
    @Query("SELECT t FROM TodoItem t WHERE t.category = :category AND (" +
            "LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "ORDER BY t.createdAt DESC")
    List<TodoItem> searchByCategoryAndKeyword(
            @Param("category") TodoCategory category,
            @Param("keyword") String keyword);

    // 按分类搜索任务并按优先级排序
    @Query("SELECT t FROM TodoItem t WHERE t.category = :category AND (" +
            "LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "ORDER BY " +
            "CASE t.priority " +
            "WHEN com.todolist.backend.enums.TodoPriority.HIGH THEN 0 " +
            "WHEN com.todolist.backend.enums.TodoPriority.MEDIUM THEN 1 " +
            "WHEN com.todolist.backend.enums.TodoPriority.LOW THEN 2 " +
            "END, t.createdAt DESC")
    List<TodoItem> searchByCategoryAndKeywordOrderByPriority(
            @Param("category") TodoCategory category,
            @Param("keyword") String keyword);

    // 按分类搜索任务并按截止日期排序
    @Query("SELECT t FROM TodoItem t WHERE t.category = :category AND (" +
            "LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "ORDER BY " +
            "CASE WHEN t.dueDate IS NULL THEN 1 ELSE 0 END, " +
            "t.dueDate ASC, t.createdAt DESC")
    List<TodoItem> searchByCategoryAndKeywordOrderByDueDate(
            @Param("category") TodoCategory category,
            @Param("keyword") String keyword);
}
