export async function GET() {
  return Response.json(
    {
      status: "ok",
      service: "chronovera",
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
