import { NextRequest } from "next/server";
import QueryString from "qs";

export async function GET(req: NextRequest) {
  const query = queryToObject(req.nextUrl.search);
  console.log({ query });
  const filter = {};
  //   for (const tmp of query) {
  //   }
  return Response.json({ ok: "ok" });
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log({ params });
  return Response.json({ ok: "ok" });
}

export function queryToObject(query: string) {
  const params = {};
  const queryString = new URLSearchParams(query);
  queryString.forEach((tmp, key) => {
    console.log({ tmp, key });
  });

  return QueryString.parse(query, {
    ignoreQueryPrefix: true,
  });
}
