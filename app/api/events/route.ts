import { NextResponse } from "next/server";

import { appendEventToSheets } from "@/lib/server/append-to-sheets";
import { getRequestIp } from "@/lib/server/get-ip";
import type { EventRecord } from "@/lib/server/lead-types";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { eventSchema } from "@/lib/validators/events";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = eventSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid event payload." }, { status: 400 });
  }

  const ip = await getRequestIp();
  const rateLimit = checkRateLimit({
    key: `event:${ip}`,
    limit: 30,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json({ ok: false, error: "Event rate limit exceeded." }, { status: 429 });
  }

  const payload: EventRecord = {
    ...parsed.data,
    ip,
    userAgent: request.headers.get("user-agent") ?? "",
    timestamp: new Date().toISOString(),
  };

  console.info("[events]", payload);
  await appendEventToSheets(payload);

  return NextResponse.json({ ok: true });
}
