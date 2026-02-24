import { getCollection } from "@/lib/db/mongodb";
import { COLLECTIONS } from "@/lib/db/collections";

//  POST /api/crops

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      title,
      cropType,
      category,
      location,
      price,
      quantity,
      unit,
      farmerId,
      description,
      status,
    } = body;

    if (!title || !price || !farmerId) {
      return Response.json(
        { success: false, message: "title, price and farmerId required" },
        { status: 400 },
      );
    }

    const crops = await getCollection(COLLECTIONS.CROPS);

    const newCrop = {
      title,
      cropType,
      category,
      location,
      price: Number(price),
      quantity: Number(quantity) || 0,
      unit: unit || "kg",
      description: description || "",
      farmerId,
      status: status || "available",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await crops.insertOne(newCrop);

    return Response.json({
      success: true,
      data: { _id: result.insertedId, ...newCrop },
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}


