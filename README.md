# TODO List Application

一个功能完整的待办事项管理应用，采用前后端分离架构，支持任务分类、优先级管理、截止日期提醒和全文搜索等功能。

##  功能特性

### 核心功能
-  添加待办事项（标题必填，描述可选）
-  删除待办事项（带二次确认）
-  标记完成/未完成（状态切换）
-  查看任务列表（全部/未完成/已完成）

### 扩展功能
-  **任务分类**：工作、学习、生活、其他
-  **优先级管理**：高、中、低三个等级
-  **截止日期**：支持设置任务到期时间，过期任务醒目提示
-  **全文搜索**：实时搜索任务标题和描述
-  **多维度排序**：按创建时间、优先级、截止日期排序
-  **数据持久化**：MySQL 数据库存储

##  技术栈

### 后端
- **Java 17** - 稳定的 LTS 版本
- **Spring Boot 3.5.7** - 企业级 Java 框架
- **Spring Data JPA** - 简化数据库操作
- **MySQL 8.0** - 关系型数据库
- **Maven** - 依赖管理

### 前端
- **React 18** - 现代化前端框架
- **TypeScript** - 类型安全
- **Ant Design 5** - 企业级 UI 组件库
- **Axios** - HTTP 客户端
- **Vite** - 快速开发构建工具
- **Day.js** - 日期处理

##  快速开始

### 环境要求
- JDK 17 或更高版本
- Node.js 18 或更高版本
- MySQL 8.0

### 1. 克隆项目
```bash
git clone https://github.com/Oliver-petersom/todolist
cd todo-app
```

### 2. 配置数据库

创建数据库：
```sql
CREATE DATABASE todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

修改后端配置文件 `backend/src/main/resources/application.yml`：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/todo_db?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
```

### 3. 启动后端
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

后端服务运行在 `http://localhost:8080`

### 4. 启动前端
```bash
cd frontend
npm install
npm run dev
```

前端应用运行在 `http://localhost:5173`

### 5. 访问应用

打开浏览器访问 `http://localhost:5173`

##  API 文档

### 基础 CRUD

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/todos` | 获取所有任务 |
| POST | `/api/todos` | 创建任务 |
| PUT | `/api/todos/{id}` | 更新任务 |
| PUT | `/api/todos/{id}/toggle` | 切换任务状态 |
| DELETE | `/api/todos/{id}` | 删除任务 |
| GET | `/api/todos/search?keyword={keyword}` | 搜索任务 |

### 查询参数

- `category` - 分类筛选（WORK/STUDY/LIFE/OTHER）
- `sortBy` - 排序方式（createdAt/priority/dueDate）
- `keyword` - 搜索关键词

### 请求示例

创建任务：
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "学习 Spring Boot",
  "description": "完成 JPA 章节",
  "category": "STUDY",
  "priority": "HIGH",
  "dueDate": "2025-11-25T18:00:00"
}
```

搜索任务：
```bash
GET /api/todos/search?keyword=Spring&category=STUDY&sortBy=priority
```

## 项目结构
```
todo-app/
├── backend/                    # Spring Boot 后端
│   ├── src/main/java/com/todolist/backend/
│   │   ├── entity/            # 实体类（TodoItem）
│   │   ├── enums/             # 枚举（Status、Category、Priority）
│   │   ├── repository/        # 数据访问层（JPA Repository）
│   │   ├── service/           # 业务逻辑层
│   │   ├── controller/        # REST API 控制器
│   │   ├── dto/               # 数据传输对象
│   │   └── common/            # 全局异常处理、统一响应
│   └── pom.xml               # Maven 配置
├── frontend/                  # React 前端
│   ├── src/
│   │   ├── components/       # React 组件
│   │   │   ├── TodoForm.tsx  # 添加任务表单
│   │   │   ├── TodoItem.tsx  # 单个任务项
│   │   │   └── TodoList.tsx  # 任务列表
│   │   ├── api/              # API 接口封装
│   │   ├── types/            # TypeScript 类型定义
│   │   └── App.tsx           # 主应用
│   └── package.json          # NPM 配置
├── README.md                 # 项目说明
└── DOC.md                    # 详细技术文档
```

## 功能演示

### 1. 任务管理
- 添加任务时可选择分类、优先级、截止日期
- 任务卡片显示彩色标签区分分类和优先级
- 过期任务显示红色边框和"已过期"标签

### 2. 智能筛选
- 按分类筛选（工作/学习/生活/其他）
- 按状态查看（全部/未完成/已完成）
- 实时搜索任务内容

### 3. 灵活排序
- 按创建时间排序（默认）
- 按优先级排序（高优先级在前）
- 按截止日期排序（最近到期在前）

##  技术亮点

### 后端设计
1. **分层架构**：Controller → Service → Repository，职责清晰
2. **DTO 模式**：请求/响应与实体解耦，保护内部模型
3. **统一响应**：Result 包装所有接口返回，便于前端处理
4. **全局异常处理**：优雅处理异常，返回友好错误信息
5. **参数校验**：Jakarta Validation 注解校验，防止非法数据

### 前端优化
1. **TypeScript**：类型安全，减少运行时错误
2. **组件化**：可复用的 React 组件，易于维护
3. **防抖优化**：搜索输入防抖（500ms），减少无效请求
4. **状态管理**：React Hooks 管理应用状态
5. **用户体验**：加载状态、错误提示、空状态友好展示

### 数据库优化
1. **索引设计**：为高频查询字段添加索引
2. **JPQL 查询**：自定义查询满足复杂排序需求
3. **软删除预留**：表结构支持软删除扩展

##  开发日志

### Git 提交历史
- `chore: 初始化项目 - 添加配置文件和文档`
- `feat: 完成 TODO List 应用 - 实现基础 CRUD 功能`
- `feat: 添加任务分类功能`
- `feat: 添加任务排序功能（优先级、截止日期）`
- `feat: 添加全文搜索功能`


##  开发者

Oliver Feng