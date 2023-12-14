import { db, storage } from "lib/firebaseConfig";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const getAdminByEmail = async (email) => {
  const q = query(collection(db, "admin"), where("email", "==", email));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      // Admin with the specified email exists, return the data
      const adminData = querySnapshot.docs[0].data();
      return { id: querySnapshot.docs[0].id, ...adminData };
    } else {
      // Admin with the specified email doesn't exist
      return null;
    }
  } catch (error) {
    console.error("Error getting admin by email:", error.message);
    throw error;
  }
};

export const userLoggin = async (credentials) => {
  try {
    console.log("ENTER NEXT AUTH SIGNIN=======");

    const userRef = doc(collection(db, "admin"), credentials.email);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return false;
      // const newUserRef = doc(collection(db, "admin"), credentials.email);
      // await setDoc(newUserRef, {
      //   email: credentials.email,
      //   isBlock: false,
      //   role: "admin",
      // });

      // const newUserDoc = await getDoc(newUserRef);
      // return newUserDoc.data();
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
