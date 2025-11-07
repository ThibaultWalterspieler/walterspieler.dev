import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RevalidatePayload = {
  path?: unknown;
  paths?: unknown;
};

const collectPaths = (payload: RevalidatePayload) => {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload.paths)) {
    return payload.paths.filter(
      (path): path is string => typeof path === "string" && path.length > 0,
    );
  }

  if (typeof payload.path === "string" && payload.path.length > 0) {
    return [payload.path];
  }

  return [];
};

const unauthorizedResponse = () =>
  NextResponse.json(
    { revalidated: false, error: "Unauthorized" },
    { status: 401 },
  );

const invalidBodyResponse = () =>
  NextResponse.json(
    { revalidated: false, error: "Invalid request body" },
    { status: 400 },
  );

const noPathsResponse = () =>
  NextResponse.json(
    { revalidated: false, error: "No valid paths provided" },
    { status: 400 },
  );

export async function POST(request: Request) {
  const secret = process.env.NEXT_REVALIDATE_SECRET;

  if (secret) {
    const header = request.headers.get("authorization");

    if (header !== `Bearer ${secret}`) {
      return unauthorizedResponse();
    }
  }

  let payload: RevalidatePayload;

  try {
    payload = await request.json();
  } catch (error) {
    console.error("Failed to parse revalidate payload", error);
    return invalidBodyResponse();
  }

  const paths = collectPaths(payload);

  if (paths.length === 0) {
    return noPathsResponse();
  }

  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths, timestamp: Date.now() });
}
