export enum TodoStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
}

export interface TodoItem {
    id: number;
    title: string;
    description: string | null;
    status: TodoStatus;
    createdAt: string;
    updatedAt: string;
}

export interface TodoCreateRequest {
    title: string;
    description?: string;
}

export interface TodoUpdateRequest {
    title?: string;
    description?: string;
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}