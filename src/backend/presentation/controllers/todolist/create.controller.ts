import { TodoListDTO } from "@/backend/application/dto/todolist.dto";
import { TodoListCreateUsecase } from "@/backend/application/use-cases/todolist/Create.usecase";
import { TodoListCreateRepository } from "@/backend/infra/repositories/todolist/Create.repository";

export const todoListCreateController = async (data: TodoListDTO) => {
  const todoListCreateRepository = TodoListCreateRepository.getInstance();
  const useCase = new TodoListCreateUsecase(todoListCreateRepository);
  return await useCase.execute(data);
};
