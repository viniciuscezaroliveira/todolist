import { TodoListDeleteUsecase } from "@/backend/application/use-cases/todolist/delete.usecase";
import { TodoListDeleteRepository } from "@/backend/infra/repositories/todolist/delete.repository";

export async function todoListDeleteController(id: string): Promise<void> {
  const todoListDeleteRepository = TodoListDeleteRepository.getInstance();
  const useCase = new TodoListDeleteUsecase(todoListDeleteRepository);
  await useCase.execute(id);
}
