import { TodoListStatus } from "@/backend/domain/entities/todolist.entity";

export class TodoListDTO {
  constructor(
    public title: string,
    public description?: string,
    public status?: TodoListStatus,
    public id?: number
  ) {}
}
