import { useRef } from 'react';
import { Empty, Spin, Tabs, Select, Space, Radio, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { TodoItem as TodoItemType } from '../types/todo';
import { TodoStatus, TodoCategory, TodoCategoryLabels } from '../types/todo';
import { TodoItem } from './TodoItem';

const { Search } = Input;

interface TodoListProps {
    todos: TodoItemType[];
    loading: boolean;
    onUpdate: () => void;
    selectedCategory: TodoCategory | undefined;
    onCategoryChange: (category: TodoCategory | undefined) => void;
    sortBy: string;
    onSortChange: (sortBy: string) => void;
    searchKeyword: string;
    onSearch: (keyword: string) => void;
}

export const TodoList = ({
                             todos,
                             loading,
                             onUpdate,
                             selectedCategory,
                             onCategoryChange,
                             sortBy,
                             onSortChange,
                             searchKeyword,
                             onSearch
                         }: TodoListProps) => {
    // 使用 ref 而不是 state
    const searchInputRef = useRef<any>(null);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Spin size="large" tip="加载中..." />
            </div>
        );
    }

    const pendingTodos = todos.filter(todo => todo.status === TodoStatus.PENDING);
    const completedTodos = todos.filter(todo => todo.status === TodoStatus.COMPLETED);

    // 处理搜索
    const handleSearch = (value: string) => {
        onSearch(value);
    };

    // 清空搜索
    const handleClearSearch = () => {
        if (searchInputRef.current) {
            searchInputRef.current.input.value = '';
        }
        onSearch('');
    };

    // 筛选、排序和搜索控制器
    const FilterAndSortControls = () => (
        <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }} size="middle">
            {/* 搜索框 - 改为非受控组件 */}
            <Search
                ref={searchInputRef}
                placeholder="搜索任务标题或描述..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                defaultValue={searchKeyword}
                onSearch={handleSearch}
                style={{ width: '100%' }}
            />

            {/* 分类和排序 */}
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
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

            {/* 搜索状态提示 */}
            {searchKeyword && (
                <div style={{ color: '#1890ff', fontSize: 14 }}>
                    🔍 搜索结果: "{searchKeyword}"
                    <a
                        style={{ marginLeft: 8 }}
                        onClick={handleClearSearch}
                    >
                        清除搜索
                    </a>
                </div>
            )}
        </Space>
    );

    // 空状态提示
    const EmptyState = ({ description }: { description: string }) => (
        <Empty
            description={searchKeyword ? `没有找到包含 "${searchKeyword}" 的任务` : description}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
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
                        <EmptyState description="暂无任务，快来添加一个吧！" />
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
                        <EmptyState description="没有未完成的任务" />
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
                        <EmptyState description="还没有完成的任务" />
                    )}
                </div>
            ),
        },
    ];

    return <Tabs defaultActiveKey="all" items={tabItems} />;
};