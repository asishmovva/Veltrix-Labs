import type { EventInput } from "@/lib/validators/events";

export function trackEvent(payload: EventInput) {
  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" });
    const queued = navigator.sendBeacon("/api/events", blob);
    if (queued) {
      return;
    }
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Fire-and-forget analytics call.
  });
}
