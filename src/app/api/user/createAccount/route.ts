import { userCreateAccountController } from "@/backend/presentation/controllers/user/createAccount.controller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = await userCreateAccountController(body);
    return Response.json(payload);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
