import { UserDTO } from "@/backend/application/dto/user.dto";
import { UserCreateAccountUsecase } from "@/backend/application/use-cases/user/CreateAccount.usecase";
import { UserCreateRepository } from "@/backend/infra/repositories/user/create.repository";

export async function userCreateAccountController(data: UserDTO) {
  try {
    const userCreateRepository = UserCreateRepository.getInstance();
    const useCase = new UserCreateAccountUsecase(userCreateRepository);
    await useCase.execute(data);
    return "Account created successfully";
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}
