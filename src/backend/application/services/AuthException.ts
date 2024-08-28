export class AuthException {
  constructor(public message: string, public status = 401) {}
}
