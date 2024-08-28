import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { UserEntity } from "@/backend/domain/entities/User.entity";
import { TodoListDeleteRepository } from "@/backend/infra/repositories/todolist/Delete.repository";
import { TodoListGetRepository } from "@/backend/infra/repositories/todolist/Get.repository";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import { TodoListDeleteUsecase } from "../Delete.usecase";

let db: PrismaClient;
beforeAll(async () => {
  await new Promise((resolve) =>
    setTimeout(async () => {
      db = new PrismaClient();
      const userEntity = new UserEntity(
        "test get",
        "test@testdelete.com",
        "123456"
      ).setEncriptyPassword();
      const user = (await db.user.create({ data: userEntity })) as any;
      await db.todolist.create({
        data: {
          title: "jest test delete",
          userId: user.id,
          completed: false,
          isDeleted: false,
        },
      });
      resolve(null);
    }, 1000)
  );
});

afterAll(async () => {
  await db.todolist.deleteMany({
    where: {
      title: "jest test delete",
    },
  });
  await db.user.deleteMany({
    where: {
      email: "test@testdelete.com",
    },
  });
});

describe("TodoListDeleteUsecase", () => {
  test("Should delete todo", async () => {
    //arrange
    const todoListUpdateRepository = TodoListDeleteRepository.getInstance();
    const todoListGetRepository = TodoListGetRepository.getInstance();
    const useCase = new TodoListDeleteUsecase(todoListUpdateRepository);
    const todoList: TodoListEntity[] = await todoListGetRepository.execute({
      title: { contains: "jest test delete" },
    });
    expect(todoList).toBeDefined();
    for await (const todo of todoList) {
      await useCase.execute(todo.id!);
    }
    const todoListUpdated: TodoListEntity[] =
      await todoListGetRepository.execute({
        title: { contains: "jest test delete" },
        isDeleted: false,
      });
    //assert
    expect(todoListUpdated).toHaveLength(0);
  });
});
