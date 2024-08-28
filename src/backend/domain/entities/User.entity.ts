import bcrypt from "bcrypt";
export class UserEntity {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id?: string
  ) {
    this.validate();
  }

  private validate() {
    if (
      !this.name ||
      !/^[a-zA-ZÀ-ÿ\s]{3,}$/.test(this.name) ||
      this.name.length > 100
    ) {
      throw new Error("Valid name is required");
    }
    if (
      !this.email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)
    ) {
      throw new Error("Valid email is required");
    }
  }

  public validateInitialPassword() {
    if (
      !this.password ||
      this.password?.length < 6 ||
      this.password?.length > 20
    ) {
      throw new Error("Valid password is required");
    }

    return this;
  }

  public setEncriptyPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
    return this;
  }

  public comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
