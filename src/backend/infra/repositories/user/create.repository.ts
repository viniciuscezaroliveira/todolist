import { IUserCreateRepository } from "@/backend/application/interfaces/repositories/user/ICreate.interface";
import { UserEntity } from "@/backend/domain/entities/User.entity";
import db from "../../db";

export class UserCreateRepository implements IUserCreateRepository {
  private static instance: UserCreateRepository;
  constructor() {}

  static getInstance() {
    if (!UserCreateRepository.instance) {
      UserCreateRepository.instance = new UserCreateRepository();
    }
    return UserCreateRepository.instance;
  }

  async execute(data: UserEntity): Promise<void> {
    await db.user.create({ data });
  }
}
