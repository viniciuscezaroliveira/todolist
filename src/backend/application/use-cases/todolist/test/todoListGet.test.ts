import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { UserEntity } from "@/backend/domain/entities/User.entity";
import { TodoListGetRepository } from "@/backend/infra/repositories/todolist/Get.repository";
import { TodoListUpdateRepository } from "@/backend/infra/repositories/todolist/update.repository";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import { TodoListGetUsecase } from "../Get.usecase";

let db: PrismaClient;
beforeAll(async () => {
  await new Promise((resolve) =>
    setTimeout(async () => {
      db = new PrismaClient();
      const userEntity = new UserEntity(
        "test get",
        "test@testget.com",
        "123456"
      ).setEncriptyPassword();
      const user = await db.user.create({ data: userEntity });
      await db.todolist.create({
        data: {
          title: "jest test get",
          userId: user.id,
          completed: false,
          isDeleted: false,
        },
      });
      resolve(null);
    }, 2000)
  );
});

afterAll(async () => {
  await db.todolist.deleteMany({
    where: {
      title: "jest test get",
    },
  });
  await db.user.deleteMany({
    where: {
      email: "test@testget.com",
    },
  });
});

describe("TodoLisGetUsecase", () => {
  test("Should get todo ", async () => {
    // Arrange
    const todoListUpdateRepository = new TodoListUpdateRepository();
    const todoListGetRepository = new TodoListGetRepository();
    const useCase = new TodoListGetUsecase(todoListGetRepository);

    // Act
    const todoList: TodoListEntity[] = await useCase.execute({
      title: "jest test get",
    });

    // Assert
    expect(todoList.length).not.toBe(0);
  });
});
