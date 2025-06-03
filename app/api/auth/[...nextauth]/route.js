import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
 

export const authoptions =  NextAuth({
    providers: [
      // OAuth authentication providers...
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),
      
    ],
    // callbacks: {
    //   async signIn({ user, account, profile, email, credentials }) {
    //      if(account.provider == "google") { 
    //     //   await connectDb()
    //       // Check if the user already exists in the database
    //       const currentUser =  await User.findOne({email: email}) 
    //       if(!currentUser){
    //         // Create a new user
    //          const newUser = await User.create({
    //           email: user.email, 
    //           username: user.email.split("@")[0], 
    //         })   
    //       } 
    //       return true
    //      }
    //   },
      
    //   async session({ session, user, token }) {
    //     const dbUser = await User.findOne({email: session.user.email})
    //     session.user.name = dbUser.username
    //     return session
    //   },
    // } 
  })

  export { authoptions as GET, authoptions as POST}