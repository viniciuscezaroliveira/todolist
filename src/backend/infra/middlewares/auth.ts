import { AuthException } from "@/backend/application/services/AuthException";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "../jwt/jwt";

function auth(request: NextRequest) {
  const token = request.headers.get("Authorization");
  if (!token) {
    return false;
  }
  const [, jwtToken] = token.split(" ");
  const payload = jwtVerify(jwtToken);
  return payload;
}

export async function appContext(request: NextRequest) {
  const isValidToken = auth(request);
  if (!isValidToken) {
    throw new AuthException("Invalid Token");
  }
  return NextResponse.next();
}
