import { UserEntity } from "../../../../domain/entities/User.entity";

export interface IUserUpdateRepository {
  update(id: string, data: Partial<UserEntity>): Promise<void>;
}
