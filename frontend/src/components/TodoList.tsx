import { Empty, Spin, Tabs, Select, Space } from 'antd';
import type { TodoItem as TodoItemType } from '../types/todo';
import { TodoStatus, TodoCategory, TodoCategoryLabels } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: TodoItemType[];
    loading: boolean;
    onUpdate: () => void;
    selectedCategory: TodoCategory | undefined;
    onCategoryChange: (category: TodoCategory | undefined) => void;
}

export const TodoList = ({
                             todos,
                             loading,
                             onUpdate,
                             selectedCategory,
                             onCategoryChange
                         }: TodoListProps) => {
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Spin size="large" tip="加载中..." />
            </div>
        );
    }

    const pendingTodos = todos.filter(todo => todo.status === TodoStatus.PENDING);
    const completedTodos = todos.filter(todo => todo.status === TodoStatus.COMPLETED);

    // 分类筛选器
    const CategoryFilter = () => (
        <Space style={{ marginBottom: 16 }}>
            <span>分类筛选：</span>
            <Select
                style={{ width: 120 }}
                placeholder="全部分类"
                allowClear
                value={selectedCategory}
                onChange={onCategoryChange}
            >
                {Object.entries(TodoCategoryLabels).map(([key, label]) => (
                    <Select.Option key={key} value={key}>
                        {label}
                    </Select.Option>
                ))}
            </Select>
        </Space>
    );

    const tabItems = [
        {
            key: 'all',
            label: `全部 (${todos.length})`,
            children: (
                <div>
                    <CategoryFilter />
                    {todos.length > 0 ? (
                        todos.map(todo => (
                            <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} />
                        ))
                    ) : (
                        <Empty description="暂无任务，快来添加一个吧！" />
                    )}
                </div>
            ),
        },
        {
            key: 'pending',
            label: `未完成 (${pendingTodos.length})`,
            children: (
                <div>
                    <CategoryFilter />
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
                    <CategoryFilter />
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