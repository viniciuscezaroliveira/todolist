import { TodoListGetUsecase } from "@/backend/application/use-cases/todolist/get.usecase";
import { TodoListUpdateUsecase } from "@/backend/application/use-cases/todolist/update.usecase";
import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { TodoListGetRepository } from "@/backend/infra/repositories/todolist/get.repository";
import { TodoListUpdateRepository } from "@/backend/infra/repositories/todolist/update.repository";

export const updateTodolistController = async (
  id: string,
  body: Partial<TodoListEntity>
) => {
  const todoListUpdateRepository = TodoListUpdateRepository.getInstance();
  const todoListGetepository = TodoListGetRepository.getInstance();
  const todoListUpdateUsecase = new TodoListUpdateUsecase(
    todoListUpdateRepository,
    todoListGetepository
  );
  const todoListgetUsecase = new TodoListGetUsecase(todoListGetepository);
  await todoListUpdateUsecase.execute(id, body);
  return await todoListgetUsecase.execute({ id });
};
