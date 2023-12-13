import { db, storage } from "lib/firebaseConfig";

import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const userLoggin = async (credentials) => {
  try {
    console.log("ENTER NEXT AUTH SIGNIN=======");

    const userRef = doc(collection(db, "users"), credentials.email);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const newUserRef = doc(collection(db, "users"), credentials.email);
      await setDoc(newUserRef, {
        email: credentials.email,
        isBlock: false,
        role: "user",
      });

      const newUserDoc = await getDoc(newUserRef);
      return newUserDoc.data();
    }
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

    const filteredUserData = [];

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();

      // Check if the role is not "admin"
      if (userData.role !== "admin") {
        filteredUserData.push(userData);
      }
    });

    return filteredUserData;
  } catch (error) {
    console.error("Error fetching all user data:", error);
    return null;
  }
};
