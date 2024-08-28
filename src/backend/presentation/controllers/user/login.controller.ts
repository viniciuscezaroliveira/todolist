import { UserLoginUseCase } from "@/backend/application/use-cases/user/Login.usecase";
import { UserGetRepository } from "@/backend/infra/repositories/user/get.repository";

export async function userLoginController(data: {
  email: string;
  password: string;
}) {
  try {
    const userGetRepository = UserGetRepository.getInstance();
    const useCase = new UserLoginUseCase(userGetRepository);
    const authToken = await useCase.execute(data.email, data.password);
    if (!authToken) return false;
    return authToken;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}
