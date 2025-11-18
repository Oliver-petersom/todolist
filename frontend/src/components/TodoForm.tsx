import { useState } from 'react';
import { Input, Button, Form, message, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { todoApi } from '../api/todoApi';
import type { TodoCreateRequest } from '../types/todo';
import { TodoCategory, TodoCategoryLabels, TodoPriority, TodoPriorityLabels } from '../types/todo';
import dayjs from 'dayjs';

const { TextArea } = Input;

interface TodoFormProps {
    onSuccess: () => void;
}

export const TodoForm = ({ onSuccess }: TodoFormProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);

            // 处理日期格式
            const request: TodoCreateRequest = {
                ...values,
                dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
            };

            await todoApi.create(request);
            message.success('任务创建成功！');
            form.resetFields();
            onSuccess();
        } catch (error) {
            message.error('创建失败，请重试');
            console.error('创建任务失败:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{
                category: TodoCategory.OTHER,
                priority: TodoPriority.MEDIUM
            }}
        >
            <Form.Item
                name="title"
                rules={[
                    { required: true, message: '请输入任务标题' },
                    { max: 255, message: '标题不能超过255个字符' }
                ]}
            >
                <Input
                    placeholder="输入任务标题..."
                    size="large"
                    prefix={<PlusOutlined />}
                />
            </Form.Item>

            <Form.Item
                name="description"
                rules={[
                    { max: 5000, message: '描述不能超过5000个字符' }
                ]}
            >
                <TextArea
                    placeholder="任务描述（可选）"
                    rows={3}
                    showCount
                    maxLength={5000}
                />
            </Form.Item>

            {/* 分类和优先级并排 */}
            <div style={{ display: 'flex', gap: 16 }}>
                <Form.Item
                    name="category"
                    label="分类"
                    rules={[{ required: true, message: '请选择分类' }]}
                    style={{ flex: 1 }}
                >
                    <Select size="large" placeholder="选择任务分类">
                        {Object.entries(TodoCategoryLabels).map(([key, label]) => (
                            <Select.Option key={key} value={key}>
                                {label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* 优先级选择 */}
                <Form.Item
                    name="priority"
                    label="优先级"
                    rules={[{ required: true, message: '请选择优先级' }]}
                    style={{ flex: 1 }}
                >
                    <Select size="large" placeholder="选择优先级">
                        {Object.entries(TodoPriorityLabels).map(([key, label]) => (
                            <Select.Option key={key} value={key}>
                                {label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>

            {/* 截止日期 */}
            <Form.Item
                name="dueDate"
                label="截止日期"
            >
                <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="选择截止日期（可选）"
                    style={{ width: '100%' }}
                    size="large"
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    block
                >
                    添加任务
                </Button>
            </Form.Item>
        </Form>
    );
};