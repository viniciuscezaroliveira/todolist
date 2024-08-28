import jwt from "jsonwebtoken";
import { config } from "../config/enviroments";
export function jwtSign(payload: any, expiresIn?: string | number | null) {
  let expiresInOrNull: string | number | null | undefined =
    expiresIn || config.AUTH_TOKEN_EXPIRES_IN;

  if (expiresInOrNull === Infinity) {
    expiresInOrNull = null;
  }

  return jwt.sign(payload, String(config.AUTH_TOKEN_SECRET), {
    expiresIn: config.AUTH_TOKEN_EXPIRES_IN,
  });
}

export function jwtVerify(token: string) {
  try {
    const payload: unknown = jwt.verify(
      token,
      String(config.AUTH_TOKEN_SECRET)
    );
    return payload;
  } catch (error) {
    return null;
  }
}
