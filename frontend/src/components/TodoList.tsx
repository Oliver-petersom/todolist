import { Empty, Spin, Tabs, Select, Space, Radio } from 'antd';
import type { TodoItem as TodoItemType } from '../types/todo';
import { TodoStatus, TodoCategory, TodoCategoryLabels } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: TodoItemType[];
    loading: boolean;
    onUpdate: () => void;
    selectedCategory: TodoCategory | undefined;
    onCategoryChange: (category: TodoCategory | undefined) => void;
    sortBy: string;
    onSortChange: (sortBy: string) => void;
}

export const TodoList = ({
                             todos,
                             loading,
                             onUpdate,
                             selectedCategory,
                             onCategoryChange,
                             sortBy,
                             onSortChange
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

    // 筛选和排序控制器
    const FilterAndSortControls = () => (
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
            <Space>
                <span>分类:</span>
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

            <Space>
                <span>排序:</span>
                <Radio.Group value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                    <Radio.Button value="createdAt">创建时间</Radio.Button>
                    <Radio.Button value="priority">优先级</Radio.Button>
                    <Radio.Button value="dueDate">截止日期</Radio.Button>
                </Radio.Group>
            </Space>
        </Space>
    );

    const tabItems = [
        {
            key: 'all',
            label: `全部 (${todos.length})`,
            children: (
                <div>
                    <FilterAndSortControls />
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
                    <FilterAndSortControls />
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
                    <FilterAndSortControls />
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