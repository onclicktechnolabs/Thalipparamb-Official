import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "models/UserModel";
import { connectToDB } from "lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// connectToDB().catch((err) => res.json(err));

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

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
        try {
          console.log(
            "🚀 ~ file: [...nextauth].js:27 ~ authorize ~ credentials:",
            credentials
          );
          const email = credentials.email;
          console.log(
            "🚀 ~ file: [...nextauth].js:44 ~ authorize ~ email:",
            email
          );
          // await connectToDB().catch((err) => {
          //   throw new Error(err);
          // });
          //check email exist in db
          // const foundUser = await User.findOne({ email });
          // if (!existingUser) {
          //   const hashedPassword = await bcrypt.hash(password, 10);

          //   const newUser = await User.create({
          //     email: credentials.email,
          //     password: hashedPassword,
          //   });
          //   return newUser;
          // }

          // if (foundUser) {
          //   console.log("User Exists");
          //   const match = await bcrypt.compare(
          //     credentials.password,
          //     foundUser.password
          //   );

          //   if (match) {
          //     console.log("Good Pass");
          //     delete foundUser.password;

          //     foundUser["role"] = "Unverified Email";
          //     return foundUser;
          //   }
          // }

          // const user = await User.findOne({
          //   email: credentials?.email,
          // }).select("+password");

          // if (!user) {
          //   throw new Error("Invalid credentials");
          // }

          // const isPasswordCorrect = await compare(
          //   credentials?.password,
          //   user.password
          // );

          // if (!isPasswordCorrect) {
          //   throw new Error("Invalid credentials");
          // }
          return { role: "admin" };
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  // pages: {
  //   signIn: "api/auth/signin",
  //   signOut: "api/auth/signout",
  //   error: "api/auth/error",
  // },

  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      console.log(
        "🚀 ~ file: [...nextauth].js:80 ~ jwt: ~  token, user,account,profile,isNewUser:",
        token,
        user,
        account,
        profile,
        isNewUser
      );
      console.log("USER ROLE", user.role);
      if (user) token.role = user.role;
      // user && (token.user = user);
      // return Promise.resolve(token);
      return token;
    },
    session: async ({ session, token }) => {
      console.log(
        "🚀 ~ file: [...nextauth].js:131 ~ session: ~ token:",
        token.role
      );
      if (session?.user) session.user.role = token.role;
      return session;
      // session.user.id = user.id;
      // return Promise.resolve(session);
      // const user = token.user;
      // session.user = user;

      // return session;
      // Attach MongoDB user ID to the session
    },
  },
  // database: process.env.MONGODB_URI,
  // callbacks: {
  //   async signIn({ user, account }) {
  //     console.log("🚀 ~ file: [...nextauth].js:23 ~ signIn ~ user:", user);
  //     if (account.provider === "google") {
  //       const { name, email } = user;
  //       try {
  //         await connectToDB();
  //         const userExists = await User.findOne({ email });

  //         if (!userExists) {
  //           const res = await fetch("http://localhost:3000/api/user", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               name,
  //               email,
  //             }),
  //           });

  //           if (res.ok) {
  //             return user;
  //           }
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

  //     return user;
  //   },
  // },
};

// export const options = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       allowDangerousEmailAccountLinking: true,

//       profile(profile) {
//         console.log("Profile Google: ", profile);

//         let userRole = "user";
//         return {
//           ...profile,
//           id: profile.sub,
//           role: userRole,
//         };
//       },
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Username:",
//           type: "text",
//           placeholder: "your-cool-username",
//         },
//         password: {
//           label: "Password:",
//           type: "password",
//           placeholder: "your-awesome-password",
//         },
//       },
//       async authorize(credentials) {
//         // This is where you need to retrieve user data
//         // to verify with credentials
//         // Docs: https://next-auth.js.org/configuration/providers/credentials
//         const user = {
//           id: "22",
//           name: "sample",
//           password: "nextauth",
//           role: "admin",
//         };

//         if (
//           credentials?.username === user.name &&
//           credentials?.password === user.password
//         ) {
//           return user;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user?.role) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       console.log("🚀 ~ file: options.js:29 ~ session ~ token:", token);
//       if (session?.user) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
// };
export default NextAuth(options);
