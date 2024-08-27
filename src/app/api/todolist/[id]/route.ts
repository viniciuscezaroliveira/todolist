import { todoListDeleteController } from "@/backend/presentation/controllers/todolist/delete.controller";
import { updateTodolistController } from "@/backend/presentation/controllers/todolist/update.controller";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const payload = await updateTodolistController(params.id, body);
  return Response.json({ ok: "ok" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await todoListDeleteController(params.id);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
