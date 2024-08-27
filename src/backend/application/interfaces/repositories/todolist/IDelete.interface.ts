export interface ITodoListDeleteRepository {
  execute: (id: string) => Promise<void>;
}
