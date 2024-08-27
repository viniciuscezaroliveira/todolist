import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";

export interface ITodoListUpdateRepository {
  execute: (id: string, data: TodoListEntity) => Promise<void>;
}
