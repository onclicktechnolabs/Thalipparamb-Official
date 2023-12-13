import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "models/UserModel";
import { connectToDB } from "lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { userLoggin } from "components/api/auth/route";

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
        console.log(
          "🚀 ~ file: [...nextauth].js:37 ~ authorize ~ credentials:",
          credentials
        );
        const { email, id, accessToken, refreshToken, accessTokenExp, role } =
          credentials;
        console.log("🚀 ~ file: [...nextauth].js:40 ~ authorize ~ role:", role);

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
        // try {
        //   const user = await userLoggin(credentials);

        //   return user;
        // } catch (error) {
        //   console.log(error);
        // }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      const tokenExp = token.accessTokenExp * 1000;
      const currentTime = await Date.now();
      if (tokenExp < currentTime) {
        console.log("token expired time");
        const data = await refreshToken(token.refreshToken);
        if (data.status) {
          return {
            ...token,
            refreshToken: data.refreshToken,
            accessToken: data.accessToken,
            accessTokenExp: data.accessTokenExp,
            ...user,
          };
        } else {
          return null;
        }
      } else {
        return { ...token, ...user };
      }

      // if (user) token.role = user.role;

      // return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      session.user = token;
      return session;

      // if (session?.user) session.user.role = token.role;
      // return session;
    },
  },
  pages: {
    signOut: "/login",
  },
};

export default NextAuth(options);
