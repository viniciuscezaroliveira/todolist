import { TodoListDTO } from "@/backend/application/dto/todolist.dto";
import { TodoListCreateRepository } from "@/backend/infra/repositories/todolist/create.repository";

import { UserEntity } from "@/backend/domain/entities/User.entity";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import { TodoListCreateUsecase } from "../create.usecase";

let db: PrismaClient;
let user: UserEntity;
beforeAll(async () => {
  await new Promise((resolve) =>
    setTimeout(async () => {
      db = new PrismaClient();
      const userEntity = new UserEntity(
        "test get",
        "test@testcreate.com",
        "123456"
      ).setEncriptyPassword();
      user = (await db.user.create({ data: userEntity })) as any;
      resolve(null);
    }, 1000)
  );
});

afterAll(async () => {
  await db.todolist.deleteMany({
    where: {
      title: "jest test create",
    },
  });
  await db.user.deleteMany({
    where: {
      email: "test@testcreate.com",
    },
  });
});
describe("TodoListCreateUsecase", () => {
  test("should be defined", async () => {
    //arrange
    const data: TodoListDTO = {
      title: "jest test create",
      userId: user.id!,
    };
    const repository = new TodoListCreateRepository();
    const useCase = new TodoListCreateUsecase(repository);
    //act
    const payload = await useCase.execute(data);

    //assert
    expect(payload.id).toBeDefined();
    expect(payload.title).toEqual("jest test create");
  });

  test("should be defined no title, return exception error", async () => {
    //arrange
    const data: TodoListDTO = {
      title: "",
      userId: user.id!,
    };
    const repository = TodoListCreateRepository.getInstance();
    const useCase = new TodoListCreateUsecase(repository);

    //assert
    await expect(useCase.execute(data)).rejects.toThrow("title is required");
  });
});
