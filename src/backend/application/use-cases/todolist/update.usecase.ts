import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { ITodoListUpdateRepository } from "../../interfaces/repositories/todolist/IUpdate.interface";

export class TodoListUpdateUsecase {
  constructor(private repository: ITodoListUpdateRepository) {}

  async execute(id: string, data: TodoListEntity): Promise<void> {
    await this.repository.execute(id, data);
  }
}
