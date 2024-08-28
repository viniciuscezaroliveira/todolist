export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password?: string,
    public readonly id?: string,
    public readonly iat?: number,
    public readonly exp?: number
  ) {}
}
