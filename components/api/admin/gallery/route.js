import { db, storage } from "lib/firebaseConfig";

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
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { formatToLocalDate } from "widgets/utility/formateDate";

// const storage = getStorage();

export const createGallery = async (data) => {
  try {
    const galleryData = { ...data, created_at: formatToLocalDate(new Date()) };
 
    const docRef = await addDoc(collection(db, "gallery"), galleryData);
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

    // Get the download URL
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
};

export const getAllGallery = async () => {
  const q = query(collection(db, "gallery"), orderBy("created_at", "desc"));
  const documents = [];

  try {
    const querySnapshot = await getDocs(q);


    const documents = querySnapshot.docs.map((doc) => {
      const { created_at,  ...data } = doc.data();
      return { id: doc.id, ...data };
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
export const deleteGallery = async (documentId) => {
  const documentRef = doc(db, "gallery", documentId);

  try {
    await deleteDoc(documentRef);
  } catch (error) {
    console.error("Error deleting document:", error.message);
    throw new Error(`Failed to delete document ${documentId}: ${error.message}`);
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
