import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// connectToDB().catch((err) => res.json(err));

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
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
        const { email, id, accessToken, refreshToken, accessTokenExp, role } =
          credentials;

        const user = {
          email,
          id,
          accessToken,
          accessTokenExp,
          refreshToken,
          role: "admin",
        };
        if (user) {
          return Promise.resolve(user);
        }
        return Promise.resolve(null);
      },
    }),
  ],
  session: {
    jwt: true,
  },
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user?.email) {
        return { ...token, ...user };
      }

      if (token?.accessTokenExpires) {
        if (Date.now() / 1000 < token?.accessTokenExpires)
          return { ...token, ...user };
      }
      // else if (token?.refreshToken) return refreshAccessToken(token);

      return { ...token, ...user };
    },
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
    session: async ({ session, token }) => {
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
