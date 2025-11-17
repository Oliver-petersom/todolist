import axios from 'axios';
import { TodoItem, TodoCreateRequest, TodoUpdateRequest, ApiResponse } from '../types/todo';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const todoApi = {
    // 获取所有任务
    getAll: async (): Promise<TodoItem[]> => {
        const response = await apiClient.get<ApiResponse<TodoItem[]>>('/todos');
        return response.data.data;
    },

    // 创建任务
    create: async (data: TodoCreateRequest): Promise<TodoItem> => {
        const response = await apiClient.post<ApiResponse<TodoItem>>('/todos', data);
        return response.data.data;
    },

    // 更新任务
    update: async (id: number, data: TodoUpdateRequest): Promise<TodoItem> => {
        const response = await apiClient.put<ApiResponse<TodoItem>>(`/todos/${id}`, data);
        return response.data.data;
    },

    // 切换状态
    toggleStatus: async (id: number): Promise<TodoItem> => {
        const response = await apiClient.put<ApiResponse<TodoItem>>(`/todos/${id}/toggle`);
        return response.data.data;
    },

    // 删除任务
    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/todos/${id}`);
    },
};