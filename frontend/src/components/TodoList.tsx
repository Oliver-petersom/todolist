import React from 'react';
import { Empty, Spin, Tabs } from 'antd';
import { TodoItem as TodoItemType, TodoStatus } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: TodoItemType[];
    loading: boolean;
    onUpdate: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, loading, onUpdate }) => {
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Spin size="large" tip="加载中..." />
            </div>
        );
    }

    if (todos.length === 0) {
        return <Empty description="暂无任务，快来添加一个吧！" />;
    }

    const pendingTodos = todos.filter(todo => todo.status === TodoStatus.PENDING);
    const completedTodos = todos.filter(todo => todo.status === TodoStatus.COMPLETED);

    const tabItems = [
        {
            key: 'all',
            label: `全部 (${todos.length})`,
            children: (
                <div>
                    {todos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} />
                    ))}
                </div>
            ),
        },
        {
            key: 'pending',
            label: `未完成 (${pendingTodos.length})`,
            children: (
                <div>
                    {pendingTodos.length > 0 ? (
                        pendingTodos.map(todo => (
                            <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} />
                        ))
                    ) : (
                        <Empty description="没有未完成的任务" />
                    )}
                </div>
            ),
        },
        {
            key: 'completed',
            label: `已完成 (${completedTodos.length})`,
            children: (
                <div>
                    {completedTodos.length > 0 ? (
                        completedTodos.map(todo => (
                            <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} />
                        ))
                    ) : (
                        <Empty description="还没有完成的任务" />
                    )}
                </div>
            ),
        },
    ];

    return <Tabs defaultActiveKey="all" items={tabItems} />;
};