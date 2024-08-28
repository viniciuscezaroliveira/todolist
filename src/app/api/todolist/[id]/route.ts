import { todoListDeleteController } from "@/backend/presentation/controllers/todolist/delete.controller";
import { updateTodolistController } from "@/backend/presentation/controllers/todolist/update.controller";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
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
