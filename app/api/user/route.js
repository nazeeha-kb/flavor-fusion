import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  await dbConnect();
  //   Checking the session
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const userEmail = session.user.email;
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }
  return new Response(
    JSON.stringify({
      createdAt: user.createdAt,
      lastGeneratedAt: user.lastGeneratedAt,
    }),
    { status: 200 }
  );
}
