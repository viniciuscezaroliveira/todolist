import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { ITodoListGetRepository } from "../../interfaces/repositories/todolist/IGet.interface";

export class TodoListGetUsecase {
  constructor(private repository: ITodoListGetRepository) {}

  async execute(
    filter: Partial<TodoListEntity>
  ): Promise<Array<TodoListEntity>> {
    const payload = await this.repository.execute(filter);
    return payload;
  }
}
