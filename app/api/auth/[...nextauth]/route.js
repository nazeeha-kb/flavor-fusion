import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/models/User";

export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "google") {
        await dbConnect();

        const userEmail = user.email;
        const currentUser = await User.findOne({ email: userEmail });

        // Check if the user already exists in the database
        // const currentUser = await User.findOne({ email: email });
        if (!currentUser) {
          // Create a new user
          await User.create({
            email: user.email
          });

        }
        return true;
      }
    },

    async session({ session, user, token }) {
      await dbConnect();
      const dbUser = await User.findOne({ email: session.user.email });
      // session.user.name = dbUser?.username || session.user.name;
      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };
