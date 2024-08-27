import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { TodoListDeleteRepository } from "@/backend/infra/repositories/todolist/delete.repository";
import { TodoListGetRepository } from "@/backend/infra/repositories/todolist/get.repository";
import { beforeAll, describe, expect, test } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import { TodoListDeleteUsecase } from "../delete.usecase";

let db: PrismaClient;
beforeAll(async () => {
  await new Promise((resolve) =>
    setTimeout(async () => {
      db = new PrismaClient();
      await db.todolist.create({
        data: { title: "jest test", completed: false, isDeleted: false },
      });
      resolve(null);
    }, 1000)
  );
});

describe("TodoListDeleteUsecase", () => {
  test("Should delete todo", async () => {
    //arrange
    const todoListUpdateRepository = TodoListDeleteRepository.getInstance();
    const todoListGetRepository = TodoListGetRepository.getInstance();
    const useCase = new TodoListDeleteUsecase(todoListUpdateRepository);
    const todoList: TodoListEntity[] = await todoListGetRepository.execute({
      title: { contains: "jest test" },
    });
    expect(todoList).toBeDefined();
    for await (const todo of todoList) {
      await useCase.execute(todo.id!);
    }
    const todoListUpdated: TodoListEntity[] =
      await todoListGetRepository.execute({
        title: { contains: "jest test" },
        isDeleted: false,
      });
    //assert
    expect(todoListUpdated).toHaveLength(0);
  });
});
