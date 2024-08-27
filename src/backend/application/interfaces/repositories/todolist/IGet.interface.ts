import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";

export interface ITodoListGetRepository {
  execute: (filter: { [key: string]: any }) => Promise<Array<TodoListEntity>>;
}
