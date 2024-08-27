import { TodoListDeleteUsecase } from "@/backend/application/use-cases/todolist/Delete.usecase";
import { TodoListDeleteRepository } from "@/backend/infra/repositories/todolist/Delete.repository";

export async function todoListDeleteController(id: string): Promise<void> {
  const todoListDeleteRepository = TodoListDeleteRepository.getInstance();
  const useCase = new TodoListDeleteUsecase(todoListDeleteRepository);
  await useCase.execute(id);
}
