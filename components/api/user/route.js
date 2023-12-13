import { db, storage } from "lib/firebaseConfig";

import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

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

export const blockUser = async (email) => {
  try {
    const userDoc = doc(db, "users", email);
    await updateDoc(userDoc, {
      isBlock: true,
    });
    console.log("User blocked successfully");
  } catch (error) {
    console.error("Error blocking user:", error);
  }
};

export const unblockUser = async (email) => {
  try {
    const userDoc = doc(db, "users", email);
    await updateDoc(userDoc, {
      isBlock: false,
    });
    console.log("User unblocked successfully");
  } catch (error) {
    console.error("Error unblocking user:", error);
  }
};
