import { doneTodolistController } from "@/backend/presentation/controllers/todolist/done.controller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await doneTodolistController(params.id);
    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: error.status || 500 });
  }
}
