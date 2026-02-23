export async function GET(req) {
  return Response.json({ success: true, message: "GET /users (admin)" });
}
