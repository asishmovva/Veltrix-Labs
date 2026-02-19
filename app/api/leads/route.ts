import { NextResponse } from "next/server";

import { appendLeadToSheets } from "@/lib/server/append-to-sheets";
import { getRequestIp } from "@/lib/server/get-ip";
import type { LeadRecord } from "@/lib/server/lead-types";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { sendLeadEmail } from "@/lib/server/send-lead-email";
import { contactLeadSchema } from "@/lib/validators/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = contactLeadSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalid form data.",
      },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  if (payload.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = await getRequestIp();
  const rateLimit = checkRateLimit({
    key: `lead:${ip}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many submissions from this IP. Please try again shortly.",
      },
      { status: 429 },
    );
  }

  const leadRecord: LeadRecord = {
    ...payload,
    ip,
    userAgent: request.headers.get("user-agent") ?? "",
    timestamp: new Date().toISOString(),
  };

  try {
    await sendLeadEmail(leadRecord);
    await appendLeadToSheets(leadRecord);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[leads] Failed to process lead", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to process your request right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
