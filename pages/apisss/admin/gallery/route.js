import { db, storage } from "@/app/[lang]/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();

export const createGallery = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "gallery"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const uploadGalleryImages = async (file) => {
  const storageRef = ref(storage, "thalipparamb/gallery" + file?.name);

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

export const getAllgallery = async () => {
  console.log("Called getAllBanner");

  const q = query(collection(db, "gallery"));
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
//get single GAllery
export const singleGallery = async (documentId) => {
  try {
    const documentRef = doc(db, "gallery", documentId);
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      const eventData = docSnap.data();
      return eventData;
    }
  } catch (error) {
    console.error("Error fetching single document:", error.message);
    throw error;
  }
};
//delete banner
export const deletegallery = async (documentId) => {
  const documentRef = doc(db, "gallery", documentId);

  try {
    await deleteDoc(documentRef);
    console.log(`Document with ID ${documentId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting document:", error.message);
    throw error;
  }
};
//update banner
export const updateGallery = async (documentId, dataToUpdate) => {
  const documentRef = doc(db, "gallery", documentId);

  try {
    await updateDoc(documentRef, dataToUpdate);
    console.log(`Document with ID ${documentId} updated successfully`);
  } catch (error) {
    console.error("Error updating document:", error.message);
    throw error;
  }
};
