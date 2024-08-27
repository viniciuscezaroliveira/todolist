import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";

export interface ITodoListCreateRepository {
  execute: (data: TodoListEntity) => Promise<TodoListEntity>;
}
