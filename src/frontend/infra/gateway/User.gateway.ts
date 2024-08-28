import { User } from "../../domain/user/User";
import IHttpClient, { FetchAdapter } from "../http/HttpClient";

export interface IUserGateway {
  createAccount(data: User): Promise<User>;
  login(email: string, password: string): Promise<string>;
  forgotPassword(data: User): Promise<void>;
  me(): Promise<User>;
}

export class UserGateway implements IUserGateway {
  private static instance: UserGateway;
  static getInstance(): UserGateway {
    if (!UserGateway.instance) {
      UserGateway.instance = new UserGateway(FetchAdapter.getInstance());
    }
    return UserGateway.instance;
  }
  constructor(private fetchAdapter: IHttpClient) {}
  async login(email: string, password: string): Promise<string> {
    return await this.fetchAdapter.post("/user/login", { email, password });
  }
  forgotPassword(data: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async createAccount(data: User): Promise<User> {
    return await this.fetchAdapter.post("/user/createAccount", data);
  }
  async me(): Promise<User> {
    return await this.fetchAdapter.get("/user/me");
  }
}
