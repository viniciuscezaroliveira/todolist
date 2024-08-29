import { jwtVerify } from "@/backend/infra/jwt/jwt";
import { appContext } from "@/backend/infra/middlewares/auth";
import { todoListCreateController } from "@/backend/presentation/controllers/todolist/create.controller";
import { getTodolistController } from "@/backend/presentation/controllers/todolist/get.controller";
import { queryToObject } from "@/frontend/application/services/queryToObject";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await appContext(req);
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const user = await jwtVerify(token!);

    const filter = queryToObject(req.nextUrl.search);
    if (filter.completed !== undefined) {
      filter.completed = (filter.completed === "true") as any;
    }
    filter.userId = user.id;
    const payload = await getTodolistController(filter);
    return Response.json(payload);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: error?.status || 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await appContext(req);
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const user = await jwtVerify(token!);

    const body = await req.json();
    body.userId = user.id;
    const payload = await todoListCreateController(body);
    return Response.json(payload);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: error.status || 500 });
  }
}
