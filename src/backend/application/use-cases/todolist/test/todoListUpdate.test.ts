import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { TodoListGetRepository } from "@/backend/infra/repositories/todolist/Get.repository";
import { TodoListUpdateRepository } from "@/backend/infra/repositories/todolist/Update.repository";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import { TodoListUpdateUsecase } from "../Update.usecase";

let db: PrismaClient;
beforeAll(async () => {
  await new Promise((resolve) =>
    setTimeout(async () => {
      db = new PrismaClient();
      await db.todolist.create({
        data: { title: "test jest ", completed: false, isDeleted: false },
      });
      resolve(null);
    }, 1000)
  );
});

afterAll(async () => {
  db = new PrismaClient();
  await db.todolist.deleteMany({
    where: { title: { contains: "jest" } },
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
      title: { contains: "test jest" },
    });

    // Assert
    expect(todoList.length).not.toBe(0);
    if (todoList.length) {
      const [firstTodo] = todoList;
      firstTodo.title = "test jest updated";
      await useCase.execute(firstTodo.id!, firstTodo);
      const todoListUpdated: TodoListEntity[] =
        await todoListGetRepository.execute({
          title: { contains: "test jest" },
        });
      expect(todoListUpdated[0].title).toEqual("test jest updated");
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
      title: { contains: "test jest" },
    });

    expect(todoList).toBeDefined();
    const [firstRegister] = todoList;

    // Act
    firstRegister.completed = true;
    await useCase.execute(firstRegister.id!, firstRegister);

    const todoListUpdated: TodoListEntity[] =
      await todoListGetRepository.execute({
        title: { contains: "test jest" },
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
      isDeleted: false,
      id: "6e1aebfd-6aab-4690-9db1-b14e8a0c545c",
    });

    // Act &&  Assert
    await expect(useCase.execute(fakeData.id!, fakeData)).rejects.toThrowError(
      "todo not found"
    );
  });
});
