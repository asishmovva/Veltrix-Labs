import type { EventRecord, LeadRecord } from "@/lib/server/lead-types";

type PostOptions = {
  requireConfig: boolean;
};

type SheetsPayload =
  | ({
      type: "lead";
    } & LeadRecord)
  | ({
      type: "event";
    } & EventRecord);

async function postToSheets(payload: SheetsPayload, options: PostOptions) {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  const token = process.env.GOOGLE_SHEETS_TOKEN;

  if (!url || !token) {
    if (options.requireConfig) {
      throw new Error("Missing GOOGLE_SHEETS_WEBAPP_URL or GOOGLE_SHEETS_TOKEN.");
    }
    return false;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      ...payload,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google Sheets append failed (${response.status}): ${body}`);
  }

  return true;
}

export async function appendLeadToSheets(lead: LeadRecord) {
  return postToSheets(
    {
      type: "lead",
      ...lead,
    },
    { requireConfig: true },
  );
}

export async function appendEventToSheets(event: EventRecord) {
  try {
    return await postToSheets(
      {
        type: "event",
        ...event,
      },
      { requireConfig: false },
    );
  } catch (error) {
    console.error("[events] Failed to append event to sheets", error);
    return false;
  }
}
