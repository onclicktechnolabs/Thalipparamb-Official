import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "user";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("🚀 ~ file: options.js:29 ~ session ~ token:", token);
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

//   callbacks: {
//     async signIn({ user, account }) {
//       let userData = null;

//       if (account.provider === "google") {
//         const { name, email } = user;

//         try {
//           console.log("ENTER NEXT AUTH SIGNIN=======");
//           const userDoc = doc(db, "admin", email);
//           const userExists = await getDoc(userDoc);

//           if (!userExists.exists()) {
//             await setDoc(userDoc, { name, email, role: "admin" });
//             userData = { name, email, role: "admin" };
//           } else {
//             userData = userExists.data();
//           }
//         } catch (error) {
//           console.error("Error creating/retrieving user:", error);
//         }
//       }

//       console.log("🚀 ~ file: route.js:36 ~ signIn ~ userData:", userData);
//       return userData; // Return user data or null if an error occurred
//     },
//   },
