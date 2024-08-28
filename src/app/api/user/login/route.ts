import { AuthException } from "@/backend/application/services/AuthException";
import { userLoginController } from "@/backend/presentation/controllers/user/login.controller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const authToken = await userLoginController(body);
    if (!authToken) {
      throw new AuthException("Invalid credentials");
    }
    return Response.json(authToken);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: error.status || 500 });
  }
}
