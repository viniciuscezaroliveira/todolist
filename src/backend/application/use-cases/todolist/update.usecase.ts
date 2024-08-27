import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { ITodoListGetRepository } from "../../interfaces/repositories/todolist/IGet.interface";
import { ITodoListUpdateRepository } from "../../interfaces/repositories/todolist/IUpdate.interface";

export class TodoListUpdateUsecase {
  constructor(
    private todoListUpdateRepository: ITodoListUpdateRepository,
    private todoListGetRepository: ITodoListGetRepository
  ) {}

  async execute(id: string, data: Partial<TodoListEntity>): Promise<void> {
    const todo = await this.todoListGetRepository.execute({
      id,
    });
    if (!todo?.length) throw new Error("todo not found");
    const [firstRegister] = todo;
    const entity = Object.assign(firstRegister, data);
    await this.todoListUpdateRepository.execute(id, entity);
  }
}
