import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { ITodoListGetRepository } from "../../interfaces/repositories/todolist/IGet.interface";

export class TodoListGetUsecase {
  constructor(private repository: ITodoListGetRepository) {}

  async execute(
    filter: Partial<TodoListEntity>
  ): Promise<Array<TodoListEntity>> {
    const predicate = this.predicate(filter);
    const payload = await this.repository.execute(predicate);
    return payload;
  }

  private predicate(filter: Partial<TodoListEntity>) {
    const { title, status } = filter;
    return {
      title: title || undefined,
      status: status ? Number(status) : undefined,
    };
  }
}
