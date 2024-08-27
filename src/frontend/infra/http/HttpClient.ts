import { CONFIG } from "../config/enviroments";

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
    const response = await fetch(url);
    return response.json();
  }
  async post(url: string, body: any): Promise<any> {
    url = `${this.baseUrl}/${url}`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  }
  async delete(url: string): Promise<any> {
    url = `${this.baseUrl}/${url}`;
    await fetch(url, {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
    });
  }
  async put(url: string, body: any): Promise<any> {
    url = `${this.baseUrl}/${url}`;
    await fetch(url, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}
