import dbConnect from "@/app/lib/dbConnect";
import Favorite from "@/app/lib/models/Favorite";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  await dbConnect();

  //   Checking the session
  const session = await getServerSession(authOptions);

  // Guard against unauthenticated users
  if (!session?.user?.id) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  //   Getting the recipe user wants to save as body
  const recipe = await req.json();
  console.log("fav recipe:", recipe)
  const userId = session.user.id;

  try {
    // Prevent duplicate entires
    const existing = await Favorite.findOne({
      userId,
      "recipe.id": recipe.id,
    });

    if (existing) {
      return new Response(
        JSON.stringify({ message: "Recipe already saved" }),
        { status: 409 }
      );
    }

    // Add recipe to favorites
    await Favorite.create({
      // same as - userId = userId
      userId,
      recipe
    })

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

  const session = await getServerSession(authOptions);

  // Guard against unauthenticated users
  if (!session?.user?.id) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  const userId = session.user.id;

  const favorites = await Favorite.find({ userId, })

  return new Response(JSON.stringify(favorites.map((f) => f.recipe)), { status: 200 });
}

export async function DELETE(req) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  const userId = session.user.id;

  //   The recipe id is the body now
  const body = await req.json();
  const { recipeId } = body;

  try {
    const result = await Favorite.deleteOne({
      userId,
      "recipe.id": recipeId,
    });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Favorite not found" }),
        { status: 404 }
      );
    }
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
