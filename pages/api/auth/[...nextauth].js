import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAdminByEmail, userLoggin } from "components/api/auth/route";

// connectToDB().catch((err) => res.json(err));

export const options = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      async profile(profile) {
        try {
          const userData = await userLoggin(profile);

          if (!userData) {
            console.error("User data not available or error occurred.");
            return null;
          }

          const userRole = userData.role || "User";

          return {
            ...profile,
            id: profile.sub,
            role: userRole,
          };
        } catch (error) {
          console.error("Error in profile:", error);
          return null;
        }
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
      session.user = token;
      return session;
    },
  },
  secret: "process.env.NEXTAUTH_SECRET",

  pages: {
    signOut: "/login",
  },
  theme: {
    colorScheme: "auto",
    logo: "/thalipparamb/apple-touch-icon.png",
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
