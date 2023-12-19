import { db, storage } from "lib/firebaseConfig";
const bcrypt = require("bcryptjs");

import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  where,
  query,
} from "firebase/firestore";

export const getAdminByEmail = async (credentials) => {
  const { email, password } = credentials;
  console.log(
    "🚀 ~ file: route.js:17 ~ Enter API getAdminByEmail ~ email:",
    email,
    password
  );

  try {
    const q = query(collection(db, "admin"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const adminData = querySnapshot.docs[0].data();

      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, adminData.password);

      if (passwordMatch) {
        const { password, ...others } = adminData;
        return { id: querySnapshot.docs[0].id, ...others };
      } else {
        // Password does not match
        return null;
      }
    } else {
      // Admin with the provided email doesn't exist
      return null;
    }
  } catch (error) {
    console.error("Error getting admin by email:", error.message);
    throw error;
  }
};

export const userLoggin = async (data) => {
  console.log("🚀 ~ file: route.js:50 ~ userLoggin ~ data:", data);
  try {
    console.log("ENTER NEXT AUTH SIGNIN=======");

    const userRef = doc(collection(db, "users"), data.email);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // User does not exist, create a new user
      const newUserRef = doc(collection(db, "users"), data.email);
      await setDoc(newUserRef, {
        email: data.email,
        name: data.name,
        isBlock: false,
        role: "User",
      });

      const newUserDoc = await getDoc(newUserRef);
      return newUserDoc.data();
    }

    // User already exists, return the user data
    return userDoc.data();
  } catch (error) {
    console.error("Error in userLoggin:", error);
    return null;
  }
};

export const getAllUserData = async () => {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);

    const userDataArray = [];

    usersSnapshot.forEach((doc) => {
      userDataArray.push({ id: doc.id, ...doc.data() });
    });

    return userDataArray;
  } catch (error) {
    console.error("Error fetching all user data:", error);
    return null;
  }
};
