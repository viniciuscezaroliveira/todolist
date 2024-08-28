import { UserEntity } from "../../../../domain/entities/User.entity";

export interface IUserGetRepository {
  execute(email: string): Promise<UserEntity | null>;
}
