export enum TodoStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
}

// 分类枚举
export enum TodoCategory {
    WORK = 'WORK',
    STUDY = 'STUDY',
    LIFE = 'LIFE',
    OTHER = 'OTHER'
}

// 分类显示名称映射
export const TodoCategoryLabels: Record<TodoCategory, string> = {
    [TodoCategory.WORK]: '工作',
    [TodoCategory.STUDY]: '学习',
    [TodoCategory.LIFE]: '生活',
    [TodoCategory.OTHER]: '其他',
};

// 分类颜色映射
export const TodoCategoryColors: Record<TodoCategory, string> = {
    [TodoCategory.WORK]: '#1890ff',  // 蓝色
    [TodoCategory.STUDY]: '#52c41a', // 绿色
    [TodoCategory.LIFE]: '#faad14',  // 橙色
    [TodoCategory.OTHER]: '#000000', // 黑色
};

export interface TodoItem {
    id: number;
    title: string;
    description: string | null;
    status: TodoStatus;
    category: TodoCategory;
    createdAt: string;
    updatedAt: string;
}

export interface TodoCreateRequest {
    title: string;
    description?: string;
    category?: TodoCategory;
}

export interface TodoUpdateRequest {
    title?: string;
    description?: string;
    category?: TodoCategory;
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}