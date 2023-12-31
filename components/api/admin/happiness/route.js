import { db, storage } from "lib/firebaseConfig";

import {
  collection,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

// const storage = getStorage();

export const createHappiness = async (data) => {
  try {
    const happinessData = { ...data, createdAt: serverTimestamp() };
    const docRef = await addDoc(collection(db, "happiness"), happinessData);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const uploadHappinessImages = async (file) => {
  const storageRef = ref(storage, "thalipparamb/happiness" + file?.name);

  try {
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Uploaded a blob or file!");

    // Get the download URL
    const url = await getDownloadURL(storageRef);
    console.log("Download URL:", url);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
};

export const getAllHappiness = async () => {
  const q = query(collection(db, "happiness"), orderBy("createdAt", "desc"));
  const documents = [];

  try {
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error("Error getting documents:", error.message);
    throw error;
  }
};
//delete banner
export const deleteHappiness = async (documentId) => {
  const documentRef = doc(db, "happiness", documentId);

  try {
    await deleteDoc(documentRef);
  } catch (error) {
    console.error("Error deleting document:", error.message);
    throw error;
  }
};
//get single happiness
export const singleHappiness = async (documentId) => {
  try {
    const documentRef = doc(db, "happiness", documentId);
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      const happinessData = docSnap.data();
      return happinessData;
    }
  } catch (error) {
    console.error("Error fetching single document:", error.message);
    throw error;
  }
};
//update banner
export const updateHappiness = async (documentId, dataToUpdate) => {
  const documentRef = doc(db, "happiness", documentId);

  try {
    await updateDoc(documentRef, dataToUpdate);
  } catch (error) {
    console.error("Error updating document:", error.message);
    throw error;
  }
};

export const deleteHappinessImage = async (imageUrl) => {
  const imageRef = ref(
    storage,
    "thalipparamb/happiness/" + getImageFileNameFromURL(imageUrl)
  );

  try {
    // Delete the file
    await deleteObject(imageRef);
    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image:", error.message);
    throw error;
  }
};

const getImageFileNameFromURL = (imageUrl) => {
  if (typeof imageUrl === "string" && imageUrl.trim() !== "") {
    const urlParts = imageUrl.split("/");
    return urlParts[urlParts.length - 1];
  } else {
    throw new Error("Invalid imageUrl");
  }
};
