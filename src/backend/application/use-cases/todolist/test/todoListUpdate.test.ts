import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { UserEntity } from "@/backend/domain/entities/User.entity";
import { TodoListGetRepository } from "@/backend/infra/repositories/todolist/Get.repository";
import { TodoListUpdateRepository } from "@/backend/infra/repositories/todolist/update.repository";

import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import { TodoListUpdateUsecase } from "../update.usecase";

let db: PrismaClient;
let user: UserEntity;
beforeAll(async () => {
  await new Promise((resolve) =>
    setTimeout(async () => {
      db = new PrismaClient();
      const userEntity = new UserEntity(
        "test update",
        "test@testupdate.com",
        "123456"
      ).setEncriptyPassword();
      user = (await db.user.create({ data: userEntity })) as any;

      await db.todolist.create({
        data: {
          title: "test update",
          userId: user.id!,
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
    where: { title: { contains: "test update" } },
  });
  await db.user.deleteMany({
    where: { email: "test@testupdate.com" },
  });
});

describe("TodoListUpdateUsecase", () => {
  test("Should update todo - title", async () => {
    // Arrange
    const todoListUpdateRepository = TodoListUpdateRepository.getInstance();
    const todoListGetRepository = TodoListGetRepository.getInstance();
    const useCase = new TodoListUpdateUsecase(
      todoListUpdateRepository,
      todoListGetRepository
    );

    // Act
    const todoList: TodoListEntity[] = await todoListGetRepository.execute({
      title: { contains: "test update" },
    });

    // Assert
    expect(todoList.length).not.toBe(0);
    if (todoList.length) {
      const [firstTodo] = todoList;
      firstTodo.title = "test updated";
      await useCase.execute(firstTodo.id!, firstTodo);
      const todoListUpdated: TodoListEntity[] =
        await todoListGetRepository.execute({
          title: { contains: "test update" },
        });
      expect(todoListUpdated[0].title).toEqual("test updated");
    }
  });

  test("Should update todo - completed", async () => {
    // Arrange
    const todoListUpdateRepository = new TodoListUpdateRepository();
    const todoListGetRepository = new TodoListGetRepository();
    const useCase = new TodoListUpdateUsecase(
      todoListUpdateRepository,
      todoListGetRepository
    );

    const todoList: TodoListEntity[] = await todoListGetRepository.execute({
      title: { contains: "test update" },
    });

    expect(todoList).toBeDefined();
    const [firstRegister] = todoList;

    // Act
    firstRegister.completed = true;
    await useCase.execute(firstRegister.id!, firstRegister);

    const todoListUpdated: TodoListEntity[] =
      await todoListGetRepository.execute({
        title: { contains: "test update" },
      });

    // Assert
    const [todoListUpdatedRegister] = todoListUpdated;
    expect(todoListUpdatedRegister.completed).toEqual(true);
  });

  test("Should update todo - not found exception", async () => {
    // Arrange
    const todoListUpdateRepository = new TodoListUpdateRepository();
    const todoListGetRepository = new TodoListGetRepository();
    const useCase = new TodoListUpdateUsecase(
      todoListUpdateRepository,
      todoListGetRepository
    );

    const fakeData: TodoListEntity = new TodoListEntity({
      title: "data fake",
      completed: false,
      userId: user.id!,
      isDeleted: false,
      id: "6e1aebfd-6aab-4690-9db1-b14e8a0c545c",
    });

    // Act &&  Assert
    await expect(useCase.execute(fakeData.id!, fakeData)).rejects.toThrowError(
      "todo not found"
    );
  });
});
