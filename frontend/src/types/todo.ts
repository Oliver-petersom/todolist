export enum TodoStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
}

export enum TodoCategory {
    WORK = 'WORK',
    STUDY = 'STUDY',
    LIFE = 'LIFE',
    OTHER = 'OTHER'
}

// 优先级枚举
export enum TodoPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
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
    [TodoCategory.WORK]: '#1890ff',
    [TodoCategory.STUDY]: '#3C005A',
    [TodoCategory.LIFE]: '#F4F5F0',
    [TodoCategory.OTHER]: '#FFD700',
};

// 优先级显示名称映射
export const TodoPriorityLabels: Record<TodoPriority, string> = {
    [TodoPriority.HIGH]: '高',
    [TodoPriority.MEDIUM]: '中',
    [TodoPriority.LOW]: '低',
};

// 优先级颜色映射
export const TodoPriorityColors: Record<TodoPriority, string> = {
    [TodoPriority.HIGH]: '#ff4d4f',    // 红色
    [TodoPriority.MEDIUM]: '#faad14',  // 橙色
    [TodoPriority.LOW]: '#52c41a',     // 绿色
};

export interface TodoItem {
    id: number;
    title: string;
    description: string | null;
    status: TodoStatus;
    category: TodoCategory;
    priority: TodoPriority;
    dueDate: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface TodoCreateRequest {
    title: string;
    description?: string;
    category?: TodoCategory;
    priority?: TodoPriority;
    dueDate?: string;
}

export interface TodoUpdateRequest {
    title?: string;
    description?: string;
    category?: TodoCategory;
    priority?: TodoPriority;
    dueDate?: string;
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}