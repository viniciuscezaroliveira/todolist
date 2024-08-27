import { TodoListDoneUsecase } from "@/backend/application/use-cases/todolist/done.usecase";
import { TodoListGetRepository } from "@/backend/infra/repositories/todolist/Get.repository";
import { TodoListUpdateRepository } from "@/backend/infra/repositories/todolist/Update.repository";

export async function doneTodolistController(id: string) {
  const todoListDoneRepository = TodoListUpdateRepository.getInstance();
  const todoListGetRepository = TodoListGetRepository.getInstance();
  const useCase = new TodoListDoneUsecase(
    todoListDoneRepository,
    todoListGetRepository
  );
  await useCase.execute(id);
}
