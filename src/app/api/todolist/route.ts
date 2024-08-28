import { appContext } from "@/backend/infra/middlewares/auth";
import { todoListCreateController } from "@/backend/presentation/controllers/todolist/create.controller";
import { getTodolistController } from "@/backend/presentation/controllers/todolist/get.controller";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await appContext(req);

    const filter = queryToObject(req.nextUrl.search);
    if (filter.completed !== undefined) {
      filter.completed = (filter.completed === "true") as any;
    }
    const payload = await getTodolistController(filter);
    return Response.json(payload);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: error?.status || 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = await todoListCreateController(body);
    return Response.json(payload);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: error.status || 500 });
  }
}

export function queryToObject(query: string): { [key: string]: string } {
  const obj: { [key: string]: any } = {};
  const queryString = new URLSearchParams(query);
  queryString.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}
