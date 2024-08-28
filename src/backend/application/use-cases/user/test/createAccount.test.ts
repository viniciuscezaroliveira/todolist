import { UserEntity } from "@/backend/domain/entities/User.entity";
import { UserCreateRepository } from "@/backend/infra/repositories/user/create.repository";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";

import { PrismaClient } from "@prisma/client";
import { UserCreateAccountUsecase } from "../CreateAccount.usecase";

let db: PrismaClient;
beforeAll(async () => {
  await new Promise((resolve) =>
    setTimeout(async () => {
      db = new PrismaClient();
      await db.user.deleteMany({
        where: {
          name: { contains: "test" },
        },
      });
      resolve(null);
    }, 1000)
  );
});

afterAll(async () => {
  await new Promise((resolve) =>
    setTimeout(async () => {
      db = new PrismaClient();
      await db.user.deleteMany({
        where: {
          name: { contains: "test" },
        },
      });
      resolve(null);
    }, 1000)
  );
});

describe("Create account tests", () => {
  const userCreateRepository = UserCreateRepository.getInstance();
  test("should be defined", async () => {
    // arrange
    const data = {
      email: "test@test.com",
      name: "test",
      password: "123456",
    };
    // act

    const useCase = new UserCreateAccountUsecase(userCreateRepository);
    const user = await useCase.execute(data);
    // assert
    expect(data).toBeDefined();
  });
  test("should be password length", async () => {
    // arrange
    const data = {
      email: "test@test.com",
      name: "test",
      password: "12345",
    };
    // act
    // assert
    const useCase = new UserCreateAccountUsecase(userCreateRepository);
    await expect(useCase.execute(data)).rejects.toThrow(
      "Valid password is required"
    );

    data.password = "1234567891011121315151617181920";
    await expect(useCase.execute(data)).rejects.toThrow(
      "Valid password is required"
    );
  });
  test("should be name length", async () => {
    // arrange
    const data = {
      email: "test@test.com",
      name: "t",
      password: "12345",
    };
    // act
    // assert
    const useCase = new UserCreateAccountUsecase(userCreateRepository);
    await expect(useCase.execute(data)).rejects.toThrow(
      "Valid name is required"
    );

    data.name = "Is example name for test usecase  - 20 characters";
    await expect(useCase.execute(data)).rejects.toThrow(
      "Valid name is required"
    );

    data.name = "test@name.com.br";
    await expect(useCase.execute(data)).rejects.toThrow(
      "Valid name is required"
    );
  });

  test("should be password length", async () => {
    // arrange
    const data = {
      email: "test@test.com",
      name: "t",
      password: "12345",
    };
    // act
    // assert
    const useCase = new UserCreateAccountUsecase(userCreateRepository);
    await expect(useCase.execute(data)).rejects.toThrow(
      "Valid name is required"
    );

    data.name = "Is example name for test usecase  - 20 characters";
    await expect(useCase.execute(data)).rejects.toThrow(
      "Valid name is required"
    );
  });

  test("should be valid email", async () => {
    // arrange
    const data = {
      email: "test",
      name: "test",
      password: "123456",
    };
    // act
    // assert
    const useCase = new UserCreateAccountUsecase(userCreateRepository);
    await expect(useCase.execute(data)).rejects.toThrow(
      "Valid email is required"
    );
  });

  test("should encrypt password", async () => {
    // arrange
    const data = {
      email: "test@testpassword.com",
      name: "test",
      password: "123456",
    };
    // act
    const useCase = new UserCreateAccountUsecase(userCreateRepository);
    const user = (await useCase.execute(data)).setEncriptyPassword();
    // assert
    expect(user.password).not.toBe(data.password);
  });

  test("should compare password", async () => {
    // arrange
    const data = {
      email: "test@testcomparepassword.com",
      name: "test",
      password: "123456",
    };
    const userEntity = new UserEntity(
      data.name,
      data.email,
      data.password
    ).setEncriptyPassword();
    // act
    const useCase = new UserCreateAccountUsecase(userCreateRepository);
    const user = (await useCase.execute(data)).setEncriptyPassword();
    // assert
    expect(user.password).not.toBe(data.password);
    expect(userEntity.comparePassword("123456")).toBe(true);
    expect(userEntity.comparePassword("1234567")).toBe(false);
  });
});
