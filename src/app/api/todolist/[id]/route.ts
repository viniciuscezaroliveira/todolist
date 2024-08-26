import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log({ params });
  return Response.json({ ok: "ok" });
}
