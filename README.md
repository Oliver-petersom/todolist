# TODO List Application

一个基于 Spring Boot + React 的待办事项管理应用。

## 技术栈

### 后端
- Java 17
- Spring Boot 3.5.7
- Spring Data JPA
- MySQL 8.0
- Maven

### 前端
- React 18
- TypeScript
- Ant Design
- Axios
- Vite

## 功能特性

- 添加待办事项
- 删除待办事项
- 标记完成/未完成
- 查看任务列表（全部/未完成/已完成）
- 数据持久化
- 分类待办事项
- 根据优先级和截止时间排序待办事项

## 快速开始

### 环境要求
- JDK 17+
- Node.js 18+
- MySQL 8.0

### 数据库配置

1. 创建数据库：
```sql
CREATE DATABASE todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 修改 `backend/src/main/resources/application.yml` 中的数据库配置

### 后端启动
```bash
cd backend
mvn spring-boot:run
```

后端服务：`http://localhost:8080`

### 前端启动
```bash
cd frontend
npm install
npm run dev
```

前端应用：`http://localhost:5173`

## API 文档

- `GET /api/todos` - 获取所有任务
- `POST /api/todos` - 创建任务
- `PUT /api/todos/{id}` - 更新任务
- `PUT /api/todos/{id}/toggle` - 切换任务状态
- `DELETE /api/todos/{id}` - 删除任务
- `GET /api/todos?category={category}` - 分类任务
- `GET api/todos?sortBy=priority` - 根据优先级排序任务
- `GET api/todos?sortBy=dueDate` - 根据截止时间排序任务

## 项目结构
```
todo-app/
├── backend/              # Spring Boot 后端
│   ├── src/main/java/com/todo/
│   │   ├── entity/      # 实体类
│   │   ├── repository/  # 数据访问层
│   │   ├── service/     # 业务逻辑层
│   │   ├── controller/  # 控制器
│   │   ├── dto/         # 数据传输对象
│   │   └── common/      # 公共类
│   └── pom.xml
├── frontend/            # React 前端
│   ├── src/
│   │   ├── components/  # 组件
│   │   ├── api/         # API 接口
│   │   └── types/       # 类型定义
│   └── package.json
└── README.md
```

## 开发说明

本项目采用前后端分离架构，后端提供 RESTful API，前端通过 Axios 调用接口，数据持久化到 MySQL。