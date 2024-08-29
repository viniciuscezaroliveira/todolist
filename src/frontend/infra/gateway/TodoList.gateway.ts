import { TodoList } from "@/frontend/domain/todolist/TodoList";
import IHttpClient, { FetchAdapter } from "../http/HttpClient";

export interface ITodoListGateway {
  get(filter: Partial<TodoList>): Promise<Array<TodoList>>;
  create(data: TodoList): Promise<TodoList>;
  update(id: string, data: Partial<TodoList>): Promise<void>;
  delete(id: string): Promise<void>;
}

export class TodoListGateway implements ITodoListGateway {
  private static instance: TodoListGateway;
  static getInstance(): TodoListGateway {
    if (!TodoListGateway.instance) {
      TodoListGateway.instance = new TodoListGateway(
        FetchAdapter.getInstance()
      );
    }
    return TodoListGateway.instance;
  }
  constructor(private fetchAdapter: IHttpClient) {}
  async get(filter: Partial<TodoList>): Promise<Array<TodoList>> {
    const searchParams = new URLSearchParams();
    if (!filter) filter = {};
    Object.entries(filter).forEach(([key, value]) => {
      if (value === undefined) return;
      searchParams.append(`${key}`, `${value}`);
    });

    return await this.fetchAdapter.get(`/todolist?${searchParams.toString()}`);
  }
  async create(data: TodoList): Promise<TodoList> {
    return await this.fetchAdapter.post("/todolist", data);
  }
  async update(id: string, data: Partial<TodoList>): Promise<void> {
    await this.fetchAdapter.put(`/todolist/${id}`, data);
  }
  async delete(id: string): Promise<void> {
    await this.fetchAdapter.delete(`/todolist/${id}`);
  }
}
