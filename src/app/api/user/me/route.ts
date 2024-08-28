import { jwtVerify } from "@/backend/infra/jwt/jwt";
import { appContext } from "@/backend/infra/middlewares/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await appContext(req);
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const user = await jwtVerify(token!);
    return Response.json(user);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: error.status || 500 });
  }
}
