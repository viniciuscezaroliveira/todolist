import { TodoListDTO } from "@/backend/application/dto/todolist.dto";
import { TodoListCreateUsecase } from "@/backend/application/use-cases/todolist/create.usecase";
import { TodoListCreateRepository } from "@/backend/infra/repositories/todolist/create.repository";

export const todoListCreateController = async (data: TodoListDTO) => {
  const todoListCreateRepository = TodoListCreateRepository.getInstance();
  const useCase = new TodoListCreateUsecase(todoListCreateRepository);
  return await useCase.execute(data);
};
