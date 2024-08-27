import { ITodoListGetRepository } from "@/backend/application/interfaces/repositories/todolist/IGet.interface";
import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import db from "../../db";

export class TodoListGetRepository implements ITodoListGetRepository {
  private static instance: TodoListGetRepository;

  constructor() {}
  static getInstance() {
    if (!TodoListGetRepository.instance) {
      TodoListGetRepository.instance = new TodoListGetRepository();
    }
    return TodoListGetRepository.instance;
  }
  async execute(filter: {
    [key: string]: any;
  }): Promise<Array<TodoListEntity>> {
    const payload = await db.todolist.findMany({
      where: filter,
    });
    return payload as TodoListEntity[];
  }
}
