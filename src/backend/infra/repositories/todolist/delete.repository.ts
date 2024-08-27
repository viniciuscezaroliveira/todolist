import { ITodoListDeleteRepository } from "@/backend/application/interfaces/repositories/todolist/IDelete.interface";
import db from "../../db";

export class TodoListDeleteRepository implements ITodoListDeleteRepository {
  private static instance: TodoListDeleteRepository;

  constructor() {}
  static getInstance() {
    if (!TodoListDeleteRepository.instance) {
      TodoListDeleteRepository.instance = new TodoListDeleteRepository();
    }
    return TodoListDeleteRepository.instance;
  }
  async execute(id: string): Promise<void> {
    await db.todolist.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
