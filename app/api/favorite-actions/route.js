import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/models/User";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  await dbConnect();

  //   Checking the session
  const session = await getServerSession(authoptions);

  //   Getting the recipe user wants to save as body
  const body = await req.json();
  console.log("the user liked recipe:", body);
  const userEmail = session.user.email;
  const user = await User.findOne({ email: userEmail });

  try {
    // Add recipe to favorites
    user.favorites.push(body);
    await user.save();

    return new Response(
      JSON.stringify({ message: "Recipe added to favorites" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Favorites POST error:", error);
    return new Response(
      JSON.stringify({
        message: "Error saving favorite",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authoptions);

  const userEmail = session.user.email;
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(user.favorites), { status: 200 });
}

export async function DELETE(req) {
  await dbConnect();

  const session = await getServerSession(authoptions);

  //   Getting the user's email
  const userEmail = session.user.email;

  //   The recipe id is the body now
  const body = await req.json();
  const { recipeId } = body;

  try {
    await User.updateOne(
      // finding the user and updating relatively
      { email: userEmail },
      { $pull: { favorites: { id: recipeId } } }
    );

    return new Response(
      JSON.stringify({ message: "Recipe removed from favorites" }),
      { status: 200 }
    );

    // ❗ Error handling
  } catch (error) {
    console.error("Favorites DELETE error:", error);
    return new Response(
      JSON.stringify({
        message: "Error deleting favorite",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
