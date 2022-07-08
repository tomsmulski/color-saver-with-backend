import { Palette } from "../_database/models/index";
import mongoose from "mongoose";
import connectToMongodb from "../_database/connect-to-mongodb";

const handler = async (request, response) => {
  try {
    await connectToMongodb();

    if (request.method === "GET") {
      const searchTerm = request.query.userid
        ? { user: request.query.userid }
        : {};

      const palettes = await Palette.find(searchTerm, null, {
        limit: 10,
        sort: { savedAt: -1 },
      })
        .populate("user")
        .exec();

      return response.json(palettes);
    } else if (request.method === "POST") {
      const newPalette = await Palette.findOneAndReplace(
        { user: mongoose.Types.ObjectId(request.body.user) },
        {
          user: mongoose.Types.ObjectId(request.body.user),
          name: request.body.palette.name,
          savedAt: Date.now(),
          colors: request.body.palette.colors,
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      const newPal = await newPalette.save();

      console.log(newPal);

      return response.status(200).json(newPal);
    }
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Server Error" + error.message });
  }
};
export default handler;
