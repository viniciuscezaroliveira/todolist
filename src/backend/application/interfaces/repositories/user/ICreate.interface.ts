import { UserEntity } from "../../../../domain/entities/User.entity";

export interface IUserCreateRepository {
  execute(data: UserEntity): Promise<void>;
}
