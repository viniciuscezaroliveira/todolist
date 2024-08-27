import { ITodoListUpdateRepository } from "@/backend/application/interfaces/repositories/todolist/IUpdate.interface";
import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import db from "../../db";

export class TodoListUpdateRepository implements ITodoListUpdateRepository {
  private static instance: TodoListUpdateRepository;

  constructor() {}
  static getInstance() {
    if (!TodoListUpdateRepository.instance) {
      TodoListUpdateRepository.instance = new TodoListUpdateRepository();
    }
    return TodoListUpdateRepository.instance;
  }
  async execute(id: string, data: TodoListEntity): Promise<void> {
    await db.todolist.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        completed: data.completed,
      },
    });
  }
}
