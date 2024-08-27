import { UserEntity } from "../../../../domain/entities/User.entity";

export interface IUserGetRepository {
  get(filter: Partial<UserEntity>): Promise<UserEntity>;
}
