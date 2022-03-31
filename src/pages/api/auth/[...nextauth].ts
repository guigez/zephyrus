import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { api } from "../../../services/api/api";
import stripeSession from "../stripeSession";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "118617181127-18g9g3hek2fgs5aeelf3itj5kql3hpd7.apps.googleusercontent.com",
      clientSecret: "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"
    })
  ],
  callbacks: {
    async session({ session, user }) {
      try {
        if (session) {

          const { data } = await api.post('/session', { name: session.user.name, email: session.user.email });


          return {
            ...session,
            token: data.toString()
          }
        }

        else return {
          ...session,
          token: 'Token missing'
        }
      }
      catch {
        return {
          ...session,
          token: 'Token missing'
        }
      }
    }
  }
})