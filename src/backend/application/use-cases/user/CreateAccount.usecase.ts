import { UserEntity } from "@/backend/domain/entities/User.entity";
import { UserDTO } from "../../dto/user.dto";
import { IUserCreateRepository } from "../../interfaces/repositories/user/ICreate.interface";

export class UserCreateAccountUsecase {
  constructor(private userCreateRepository: IUserCreateRepository) {}
  async execute(data: UserDTO) {
    try {
      const user = new UserEntity(data.name, data.email, data.password)
        .validateInitialPassword()
        .setEncriptyPassword();
      console.log({ user });
      await this.userCreateRepository.execute(user);
      return user;
    } catch (error) {
      throw new Error("Error creating account - Checking your data");
    }
  }
}
