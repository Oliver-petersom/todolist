import { useState } from 'react';
import { Card, Button, Space, Typography, Popconfirm, message, Tag } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TodoItem as TodoItemType } from '../types/todo';
import { TodoStatus, TodoCategoryLabels, TodoCategoryColors } from '../types/todo';
import { todoApi } from '../api/todoApi';

const { Text, Paragraph } = Typography;

interface TodoItemProps {
    todo: TodoItemType;
    onUpdate: () => void;
}

export const TodoItem = ({ todo, onUpdate }: TodoItemProps) => {
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        try {
            setLoading(true);
            await todoApi.toggleStatus(todo.id);
            message.success(
                todo.status === TodoStatus.PENDING ? '任务已完成！' : '任务已标记为未完成'
            );
            onUpdate();
        } catch (error) {
            message.error('操作失败，请重试');
            console.error('切换状态失败:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await todoApi.delete(todo.id);
            message.success('任务已删除');
            onUpdate();
        } catch (error) {
            message.error('删除失败，请重试');
            console.error('删除任务失败:', error);
        } finally {
            setLoading(false);
        }
    };

    const isCompleted = todo.status === TodoStatus.COMPLETED;

    return (
        <Card
            style={{
                marginBottom: 16,
                backgroundColor: isCompleted ? '#f6ffed' : '#ffffff',
                borderColor: isCompleted ? '#b7eb8f' : '#d9d9d9',
            }}
        >
            <Space direction="vertical" style={{ width: '100%' }} size="small">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                        {/* 标题和分类标签 */}
                        <div style={{ marginBottom: 8 }}>
                            <Text
                                strong
                                style={{
                                    fontSize: 16,
                                    textDecoration: isCompleted ? 'line-through' : 'none',
                                    color: isCompleted ? '#8c8c8c' : '#000000',
                                    marginRight: 8,
                                }}
                            >
                                {todo.title}
                            </Text>
                            {/* 分类标签 */}
                            <Tag color={TodoCategoryColors[todo.category]}>
                                {TodoCategoryLabels[todo.category]}
                            </Tag>
                        </div>

                        {todo.description && (
                            <Paragraph
                                style={{
                                    marginTop: 8,
                                    marginBottom: 0,
                                    color: isCompleted ? '#8c8c8c' : '#595959',
                                }}
                            >
                                {todo.description}
                            </Paragraph>
                        )}
                    </div>

                    <Space>
                        <Button
                            type={isCompleted ? 'default' : 'primary'}
                            icon={isCompleted ? <CloseOutlined /> : <CheckOutlined />}
                            onClick={handleToggle}
                            loading={loading}
                        >
                            {isCompleted ? '取消完成' : '完成'}
                        </Button>

                        <Popconfirm
                            title="确定要删除这个任务吗？"
                            onConfirm={handleDelete}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                loading={loading}
                            >
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                </div>

                <Text type="secondary" style={{ fontSize: 12 }}>
                    创建时间: {new Date(todo.createdAt).toLocaleString('zh-CN')}
                </Text>
            </Space>
        </Card>
    );
};