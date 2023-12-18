import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAdminByEmail } from "components/api/auth/route";

// connectToDB().catch((err) => res.json(err));

export const options = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log(
          "🚀 ~ file: [...nextauth].js:12 ~ profile ~ profile:",
          profile
        );
        let userRole = "User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        console.log(
          "🚀 ~ file: [...nextauth].js:42 ~ authorize ~ credentials:",
          credentials
        );
        const adminData = await getAdminByEmail(credentials);

        if (adminData) {
          return Promise.resolve(adminData);
        }
        return Promise.resolve(null);
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },

    session: async ({ session, token, user }) => {
      console.log("🚀 ~ file: [...nextauth].js:65 ~ session: ~ token:", token);
      session.user = token;
      return session;
    },
  },
  secret: "process.env.NEXTAUTH_SECRET",

  pages: {
    signOut: "/login",
  },
};

export default NextAuth(options);

// jwt: async ({ token, user }) => {
//   const tokenExp = token.accessTokenExp * 1000;

//   const currentTime = await Date.now();
//   if (tokenExp < currentTime) {
//     console.log("token expired time");
//     const data = await refreshToken(token.refreshToken);
//     if (data.status) {
//       return {
//         // ...token,
//         refreshToken: data.refreshToken,
//         accessToken: data.accessToken,
//         accessTokenExp: data.accessTokenExp,
//         ...user,
//       };
//     } else {
//       return null;
//     }
//   } else {
//     console.log("token not expire");
//     return { ...token, ...user };
//   }
// },
