import jwt from "jsonwebtoken";
import { config } from "../config/enviroments";
export function jwtSign(payload: any, expiresIn?: string | number | null) {
  return jwt.sign(payload, String(config.AUTH_TOKEN_SECRET), {
    expiresIn: Number(config.AUTH_TOKEN_EXPIRES_IN) || 60 * 60 * 24,
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
