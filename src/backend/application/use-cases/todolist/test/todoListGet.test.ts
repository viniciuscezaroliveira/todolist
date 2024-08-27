import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { TodoListGetRepository } from "@/backend/infra/repositories/todolist/get.repository";
import { TodoListUpdateRepository } from "@/backend/infra/repositories/todolist/update.repository";
import { beforeAll, describe, expect, test } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import { TodoListGetUsecase } from "../get.usecase";

let db: PrismaClient;
beforeAll(async () => {
  await new Promise((resolve) =>
    setTimeout(async () => {
      db = new PrismaClient();
      await db.todolist.create({
        data: { title: "jest test", completed: false, isDeleted: false },
      });
      resolve(null);
    }, 2000)
  );
});

describe("TodoLisGetUsecase", () => {
  test("Should get todo ", async () => {
    // Arrange
    const todoListUpdateRepository = new TodoListUpdateRepository();
    const todoListGetRepository = new TodoListGetRepository();
    const useCase = new TodoListGetUsecase(todoListGetRepository);

    // Act
    const todoList: TodoListEntity[] = await useCase.execute({
      title: "jest test",
    });

    // Assert
    expect(todoList.length).not.toBe(0);
  });
});
