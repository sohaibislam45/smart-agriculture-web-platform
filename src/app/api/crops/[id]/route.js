import { getCollection } from "@/lib/db/mongodb";
import { COLLECTIONS } from "@/lib/db/collections";
import { ObjectId } from "mongodb";

//  GET /api/crops/:id
export async function GET(req, { params }) {
  try {
    const crops = await getCollection(COLLECTIONS.CROPS);

    const crop = await crops.findOne({ _id: new ObjectId(params.id) });

    if (!crop) {
      return Response.json(
        { success: false, message: "Crop not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, data: crop });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
