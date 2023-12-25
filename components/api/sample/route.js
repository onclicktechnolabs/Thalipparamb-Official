import { db, storage } from "lib/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signIn = async (user) => {
  const { displayName, email } = user;
  let userData = { name: displayName, email, role: "user", isBlock: false };

  try {
    const userDoc = doc(db, "users", email);
    const userExists = await getDoc(userDoc);

    if (!userExists.exists()) {
      await setDoc(userDoc, userData);
    } else {
      userData = userExists.data();
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
    const userDoc = doc(db, "users", email);
    const userExists = await getDoc(userDoc);

    if (!userExists.exists()) {
      await setDoc(userDoc, userData);
    } else {
      userData = userExists.data();
    }
  } catch (error) {
    console.error("Error creating/retrieving user:", error);
  }

  return userData;
};
