import { UserEntity } from "@/backend/domain/entities/User.entity";
import { jwtSign } from "@/backend/infra/jwt/jwt";
import { IUserGetRepository } from "../../interfaces/repositories/user/IGet.interface";

export class UserLoginUseCase {
  constructor(private userGetRepository: IUserGetRepository) {}

  async execute(email: string, password: string) {
    const userResponse = await this.userGetRepository.execute(email);
    if (!userResponse) {
      throw new Error("User not found");
    }
    const userEntity = new UserEntity(
      userResponse.name,
      userResponse.email,
      userResponse.password,
      userResponse.id
    );
    const isPasswordValid = userEntity.comparePassword(password);
    if (!isPasswordValid) {
      return false;
    }
    return await jwtSign({
      id: userEntity.id,
      email: userEntity.email,
      name: userEntity.name,
    });
  }
}
