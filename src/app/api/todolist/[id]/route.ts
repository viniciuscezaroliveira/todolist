import { jwtVerify } from "@/backend/infra/jwt/jwt";
import { appContext } from "@/backend/infra/middlewares/auth";
import { todoListDeleteController } from "@/backend/presentation/controllers/todolist/delete.controller";
import { updateTodolistController } from "@/backend/presentation/controllers/todolist/update.controller";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await appContext(req);
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const user = await jwtVerify(token!);
    const body = await req.json();
    body.userId = user.id;
    const payload = await updateTodolistController(params.id, body);
    return Response.json(payload);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: error.status || 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await todoListDeleteController(params.id);
    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: error.status || 500 });
  }
}
