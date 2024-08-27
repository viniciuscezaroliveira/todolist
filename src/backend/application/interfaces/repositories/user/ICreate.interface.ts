import { UserEntity } from "../../../../domain/entities/User.entity";

export interface IUserCreateRepository {
  create(data: UserEntity): Promise<UserEntity>;
}
