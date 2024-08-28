import { IUserGetRepository } from "@/backend/application/interfaces/repositories/user/IGet.interface";
import { UserEntity } from "@/backend/domain/entities/User.entity";
import db from "../../db";

export class UserGetRepository implements IUserGetRepository {
  private static instance: UserGetRepository;
  constructor() {}

  static getInstance() {
    if (!UserGetRepository.instance) {
      UserGetRepository.instance = new UserGetRepository();
    }
    return UserGetRepository.instance;
  }

  async execute(email: string): Promise<UserEntity | null> {
    return (await db.user.findUnique({
      where: {
        email,
      },
    })) as UserEntity | null;
  }
}
