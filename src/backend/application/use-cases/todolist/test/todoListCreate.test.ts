import { TodoListDTO } from "@/backend/application/dto/todolist.dto";
import { TodoListCreateRepository } from "@/backend/infra/repositories/todolist/create.repository";
import { describe, expect, test } from "@jest/globals";
import { TodoListCreateUsecase } from "../create.usecase";

describe("TodoListCreateUsecase", () => {
  test("should be defined", async () => {
    //arrange
    const data: TodoListDTO = {
      title: "jest test",
    };
    const repository = new TodoListCreateRepository();
    const useCase = new TodoListCreateUsecase(repository);
    //act
    const payload = await useCase.execute(data);

    //assert
    expect(payload.id).toBeDefined();
    expect(payload.title).toEqual("jest test");
  });

  test("should be defined no title, return exception error", async () => {
    //arrange
    const data: TodoListDTO = {
      title: "",
    };
    const repository = TodoListCreateRepository.getInstance();
    const useCase = new TodoListCreateUsecase(repository);

    //assert
    await expect(useCase.execute(data)).rejects.toThrow("title is required");
  });
});
