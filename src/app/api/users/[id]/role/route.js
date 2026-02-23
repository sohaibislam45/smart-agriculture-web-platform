export async function PATCH(req, { params }) {
  return Response.json({
    success: true,
    message: `PATCH /users/${params.id}/role (admin)`,
  });
}
