import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { todoApi } from '../api/todoApi';
import { TodoCreateRequest } from '../types/todo';

const { TextArea } = Input;

interface TodoFormProps {
    onSuccess: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: TodoCreateRequest) => {
        try {
            setLoading(true);
            await todoApi.create(values);
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
            style={{ marginBottom: 24 }}
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