import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/models/User";
import { ObjectId } from "mongoose";

export async function GET(req, { params }) {
  await dbConnect();
  //   Gets the session
  const session = await getServerSession(authOptions);

  //   If no session error handling
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  // Finds the user in teh db and handles error if user not found
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  //   Now we define the slug - it's the param given from FE
  const slugOrId = params.slug;

  // Finds the recipe from favorites that matches this slug and returns it.
  const recipe = user.favorites.find((r) => {
    return (
      r.slug === slugOrId
        || (r._id && r._id.toString() === slugOrId)
    );
  });

  if (!recipe) {
    return new Response(JSON.stringify({ message: "Recipe not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(recipe), { status: 200 });
}
