import { ITodoListDeleteRepository } from "../../interfaces/repositories/todolist/IDelete.interface";

export class TodoListDeleteUsecase {
  constructor(private repository: ITodoListDeleteRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.execute(id);
  }
}
