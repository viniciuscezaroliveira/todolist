import { ITodoListCreateRepository } from "@/backend/application/interfaces/repositories/todolist/ICreate.interface";
import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import db from "../../db";

export class TodoListCreateRepository implements ITodoListCreateRepository {
  private static instance: TodoListCreateRepository;

  constructor() {}
  static getInstance() {
    if (!TodoListCreateRepository.instance) {
      TodoListCreateRepository.instance = new TodoListCreateRepository();
    }
    return TodoListCreateRepository.instance;
  }

  async execute(data: TodoListEntity): Promise<TodoListEntity> {
    const { title, description, status } = data;
    const payload = await db.todolist.create({
      data: {
        title,
        description: description ?? "",
        status,
      },
    });
    return payload as TodoListEntity;
  }
}
