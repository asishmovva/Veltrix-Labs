import { headers } from "next/headers";

function extractFirstForwardedIp(value: string | null) {
  if (!value) return "";
  return value
    .split(",")
    .map((entry) => entry.trim())
    .find(Boolean) ?? "";
}

export async function getRequestIp() {
  const requestHeaders = await headers();
  const forwardedFor = extractFirstForwardedIp(requestHeaders.get("x-forwarded-for"));
  const realIp = requestHeaders.get("x-real-ip")?.trim() ?? "";
  const ip = forwardedFor || realIp || "0.0.0.0";
  return ip;
}
