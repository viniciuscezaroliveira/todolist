import { CONFIG } from "../config/enviroments";
import { eraseCookie } from "../cookies/erase";
import { getCookie } from "../cookies/get";

export default interface IHttpClient {
  get(url: string): Promise<any>;
  post(url: string, body: any): Promise<any>;
  put(url: string, body: any): Promise<any>;
  delete(url: string): Promise<any>;
}

export class FetchAdapter implements IHttpClient {
  private static instance: FetchAdapter;
  private baseUrl: string;

  static getInstance(): FetchAdapter {
    if (!FetchAdapter.instance) {
      FetchAdapter.instance = new FetchAdapter();
    }
    return FetchAdapter.instance;
  }
  constructor() {
    this.baseUrl = CONFIG.baseUrl;
  }
  async get(url: string): Promise<any> {
    url = `${this.baseUrl}/${url}`;
    return await this.execute(url, "get");
  }
  async post(url: string, body: any): Promise<any> {
    url = `${this.baseUrl}/${url}`;
    return await this.execute(url, "post", body);
  }
  async delete(url: string): Promise<any> {
    url = `${this.baseUrl}/${url}`;
    return await this.execute(url, "delete");
  }
  async put(url: string, body: any): Promise<any> {
    url = `${this.baseUrl}/${url}`;
    return await this.execute(url, "put", body);
  }

  private async execute(
    url: string,
    method: "get" | "post" | "put" | "delete",
    body?: any
  ) {
    return await new Promise(async (resolve, reject) => {
      const token = getCookie(CONFIG.cookieTokenName!);

      const configRequest: { [key: string]: any } = {
        method: method,
        headers: {
          "content-type": "application/json",
        },
      };
      if (token) {
        configRequest["headers"]["Authorization"] = `Bearer ${token}`;
      }
      if (method === "post" || method === "put") {
        configRequest["body"] = JSON.stringify(body);
      }
      const response = await fetch(url, configRequest);
      if (!response.ok) {
        if (response.status === 401) {
          eraseCookie(CONFIG.cookieTokenName!);
          return reject("Unauthorized");
        }
        const errorData = await response.json();
        return reject(errorData);
      }
      return resolve(response.json());
    });
  }
}
