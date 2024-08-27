import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { TodoListDTO } from "../../dto/todolist.dto";
import { ITodoListCreateRepository } from "../../interfaces/repositories/todolist/ICreate.interface";

export class TodoListCreateUsecase {
  constructor(private repository: ITodoListCreateRepository) {}

  async execute(data: TodoListDTO): Promise<TodoListEntity> {
    const entity = new TodoListEntity({
      title: data.title,
    });
    const payload = await this.repository.execute(entity);
    return payload;
  }
}
