import { TodoListGetUsecase } from "@/backend/application/use-cases/todolist/get.usecase";
import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { TodoListGetRepository } from "@/backend/infra/repositories/todolist/get.repository";

export async function getTodolistController(
  filter: Partial<TodoListEntity>
): Promise<Array<TodoListEntity>> {
  const todoListGetRepository = TodoListGetRepository.getInstance();
  const useCase = new TodoListGetUsecase(todoListGetRepository);
  return await useCase.execute(filter);
}
