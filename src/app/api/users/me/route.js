export async function GET(req) {
  return Response.json({ success: true, message: "GET /users/me" });
}

export async function PUT(req) {
  return Response.json({ success: true, message: "PUT /users/me" });
}