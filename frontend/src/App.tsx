import { useState, useEffect, useCallback } from 'react';
import { Layout, Typography, Card, message } from 'antd';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { todoApi } from './api/todoApi';
import type { TodoItem } from './types/todo';
import { TodoCategory } from './types/todo';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

// 防抖 Hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

function App() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<TodoCategory | undefined>(undefined);
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    // 使用防抖优化搜索
    const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            let data: TodoItem[];

            // 如果有搜索关键词，使用搜索接口
            if (debouncedSearchKeyword.trim()) {
                data = await todoApi.search(debouncedSearchKeyword, selectedCategory, sortBy);
            } else {
                // 否则使用普通查询
                data = await todoApi.getAll(selectedCategory, sortBy);
            }

            setTodos(data);
        } catch (error) {
            message.error('获取任务列表失败');
            console.error('获取任务失败:', error);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearchKeyword, selectedCategory, sortBy]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const handleCategoryChange = (category: TodoCategory | undefined) => {
        setSelectedCategory(category);
    };

    const handleSortChange = (newSortBy: string) => {
        setSortBy(newSortBy);
    };

    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Header style={{ backgroundColor: '#1890ff' }}>
                <Title level={2} style={{ color: 'white', margin: '14px 0' }}>
                    📝 TODO List
                </Title>
            </Header>

            <Content style={{ padding: '24px 16px' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <Card style={{ marginBottom: 24 }}>
                        <TodoForm onSuccess={fetchTodos} />
                    </Card>

                    <Card>
                        <TodoList
                            todos={todos}
                            loading={loading}
                            onUpdate={fetchTodos}
                            selectedCategory={selectedCategory}
                            onCategoryChange={handleCategoryChange}
                            sortBy={sortBy}
                            onSortChange={handleSortChange}
                            searchKeyword={searchKeyword}
                            onSearch={handleSearch}
                        />
                    </Card>
                </div>
            </Content>
        </Layout>
    );
}

export default App;
