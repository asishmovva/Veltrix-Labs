export async function GET() {
  return Response.json(
    {
      status: "ok",
      service: "veltrix-labs",
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
