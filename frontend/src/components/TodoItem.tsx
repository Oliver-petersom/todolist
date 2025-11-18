import { useState } from 'react';
import { Card, Button, Space, Typography, Popconfirm, message, Tag } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined, ClockCircleOutlined, FlagOutlined } from '@ant-design/icons';
import type { TodoItem as TodoItemType } from '../types/todo';
import { TodoStatus, TodoCategoryLabels, TodoCategoryColors, TodoPriorityLabels, TodoPriorityColors } from '../types/todo';
import { todoApi } from '../api/todoApi';
import dayjs from 'dayjs';

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

    // 判断是否即将到期（3天内）
    const isNearDue = todo.dueDate && dayjs(todo.dueDate).diff(dayjs(), 'day') <= 3 && dayjs(todo.dueDate).isAfter(dayjs());

    // 判断是否已过期
    const isOverdue = todo.dueDate && dayjs(todo.dueDate).isBefore(dayjs()) && !isCompleted;

    return (
        <Card
            style={{
                marginBottom: 16,
                backgroundColor: isCompleted ? '#f6ffed' : '#ffffff',
                borderColor: isCompleted ? '#b7eb8f' : isOverdue ? '#ff4d4f' : '#d9d9d9',
                borderWidth: isOverdue ? 2 : 1,
            }}
        >
            <Space direction="vertical" style={{ width: '100%' }} size="small">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                        {/* 标题、分类和优先级 */}
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

                            {/* 优先级标签 */}
                            <Tag icon={<FlagOutlined />} color={TodoPriorityColors[todo.priority]}>
                                {TodoPriorityLabels[todo.priority]}
                            </Tag>
                        </div>

                        {/* 截止日期 */}
                        {todo.dueDate && (
                            <div style={{ marginBottom: 8 }}>
                                <Tag
                                    icon={<ClockCircleOutlined />}
                                    color={isOverdue ? 'error' : isNearDue ? 'warning' : 'default'}
                                >
                                    {isOverdue ? '已过期: ' : '截止: '}
                                    {dayjs(todo.dueDate).format('YYYY-MM-DD HH:mm')}
                                </Tag>
                            </div>
                        )}

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
                    创建时间: {dayjs(todo.createdAt).format('YYYY-MM-DD HH:mm')}
                </Text>
            </Space>
        </Card>
    );
};