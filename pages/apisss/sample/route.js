import { db } from "@/app/[lang]/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signIn = async (user) => {
  const { displayName, email } = user;
  let userData = { name: displayName, email, role: "user", isBlock: false };

  try {
    console.log("ENTER SIGNIN=======");
    const userDoc = doc(db, "users", email);
    const userExists = await getDoc(userDoc);

    if (!userExists.exists()) {
      await setDoc(userDoc, userData);
      console.log(
        "User does not exist in Firestore. User data stored:",
        userData
      );
    } else {
      userData = userExists.data();
      console.log("User data retrieved from Firestore:", userData);
    }
  } catch (error) {
    console.error("Error creating/retrieving user:", error);
  }

  return userData;
};

//admin sign In
export const adminSignIn = async (user) => {
  const { displayName, email } = user;
  let userData = { name: displayName, email, role: "admin" };

  try {
    console.log("ENTER SIGNIN=======");
    const userDoc = doc(db, "users", email);
    const userExists = await getDoc(userDoc);

    if (!userExists.exists()) {
      await setDoc(userDoc, userData);
      console.log(
        "User does not exist in Firestore. User data stored:",
        userData
      );
    } else {
      userData = userExists.data();
      console.log("User data retrieved from Firestore:", userData);
    }
  } catch (error) {
    console.error("Error creating/retrieving user:", error);
  }

  return userData;
};

//cancelled next auth
// import GoogleProvider from "next-auth/providers/google";
// import db from "@/app/[lang]/firebaseConfig";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
// import NextAuth from "next-auth/next";

// const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider !== "google") {
//         return null;
//       }

//       const { name, email } = user;
//       let userData = null;

//       try {
//         console.log("ENTER NEXT AUTH SIGNIN=======");
//         const userDoc = doc(db, "admin", email);
//         const userExists = await getDoc(userDoc);

//         if (!userExists.exists()) {
//           await setDoc(userDoc, { name, email, role: "admin" });
//           userData = { name, email, role: "admin" };
//         } else {
//           userData = userExists.data();
//         }
//       } catch (error) {
//         console.error("Error creating/retrieving user:", error);
//       }

//       return userData;
//     },

//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
