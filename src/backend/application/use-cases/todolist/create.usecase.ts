import {
  TodoListEntity,
  TodoListStatus,
} from "@/backend/domain/entities/todolist.entity";
import { TodoListDTO } from "../../dto/todolist.dto";
import { ITodoListCreateRepository } from "../../interfaces/repositories/todolist/ICreate.interface";

export class TodoListCreateUsecase {
  constructor(private repository: ITodoListCreateRepository) {}

  async execute(data: TodoListDTO): Promise<TodoListEntity> {
    const entity = new TodoListEntity({
      title: data.title,
      status: TodoListStatus.open,
      description: data.description ?? "",
    });
    const payload = await this.repository.execute(entity);
    return payload;
  }
}
