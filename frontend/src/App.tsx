import { useState, useEffect } from 'react';
import { Layout, Typography, Card, message } from 'antd';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { todoApi } from './api/todoApi';
import type { TodoItem } from './types/todo';
import { TodoCategory } from './types/todo';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<TodoCategory | undefined>(undefined);
    const [sortBy, setSortBy] = useState<string>('createdAt');

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const data = await todoApi.getAll(selectedCategory, sortBy);
            setTodos(data);
        } catch (error) {
            message.error('获取任务列表失败');
            console.error('获取任务失败:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [selectedCategory, sortBy]);

    const handleCategoryChange = (category: TodoCategory | undefined) => {
        setSelectedCategory(category);
    };

    const handleSortChange = (newSortBy: string) => {
        setSortBy(newSortBy);
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
                        />
                    </Card>
                </div>
            </Content>
        </Layout>
    );
}

export default App;
