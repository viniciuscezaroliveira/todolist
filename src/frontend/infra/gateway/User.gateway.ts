import { User } from "../../domain/user/User";
import { TodoList } from "../../todolist/TodoList";
import IHttpClient, { FetchAdapter } from "../http/HttpClient";

export interface ITodoListGateway {
  get(filter: Partial<TodoList>): Promise<Array<TodoList>>;
  create(data: TodoList): Promise<TodoList>;
  update(id: string, data: Partial<TodoList>): Promise<void>;
  delete(id: string): Promise<void>;
}

export class UserGateway implements ITodoListGateway {
  private static instance: UserGateway;
  static getInstance(): UserGateway {
    if (!UserGateway.instance) {
      UserGateway.instance = new UserGateway(FetchAdapter.getInstance());
    }
    return UserGateway.instance;
  }
  constructor(private fetchAdapter: IHttpClient) {}
  get(filter: Partial<TodoList>): Promise<Array<TodoList>> {
    throw new Error("Method not implemented.");
  }
  create(data: TodoList): Promise<TodoList> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: Partial<TodoList>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  // async login(filter: Partial<TodoList>): Promise<Array<TodoList>> {
  //   const searchParams = new URLSearchParams();
  //   if (!filter) filter = {};
  //   Object.entries(filter).forEach(([key, value]) => {
  //     if (value === undefined) return;
  //     searchParams.append(`${key}`, `${value}`);
  //   });

  //   return await this.fetchAdapter.get(`/user?${searchParams.toString()}`);
  // }
  async createAccount(data: User): Promise<TodoList> {
    return await this.fetchAdapter.post("/user", data);
  }
  // async forgotPassword(id: string, data: Partial<TodoList>): Promise<void> {
  //   await this.fetchAdapter.put(`/todolist/${id}`, data);
  // }
}
