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
  getFirestore,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();
// const db = getFirestore(app);

export const createBanner = async (data) => {
  try {
    const bannerData = { ...data, createdAt: new Date().toISOString() };

    const docRef = await addDoc(collection(db, "baner"), bannerData);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const uploadImages = async (file) => {
  const storageRef = ref(storage, "thalipparamb/" + file?.name);

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

//get all banners
// export const getAllbanner = async () => {
//   const documents = [];

//   try {
//     const querySnapshot = await getDocs(collection(db, "thalipparamb"));

//     querySnapshot.forEach((doc) => {
//       documents.push({ id: doc.id, ...doc.data() });
//     });

//     console.log(
//       "🚀 ~ file: route.js:37 ~ getAllbanner ~ documents:",
//       documents
//     );
//     return documents;
//   } catch (error) {
//     console.error("Error getting documents:", error.message);
//     throw error;
//   }
// };
export const getAllBanner = async () => {
  const q = query(collection(db, "baner"), orderBy("createdAt", "desc"));

  try {
    const querySnapshot = await getDocs(q);

    const documents = querySnapshot.docs.map((doc) => {
      const { createdAt,scheduleDate,  ...data } = doc.data();
      return { id: doc.id, ...data };
    });

    return documents;
  } catch (error) {
    console.error("Error getting documents:", error.message);
    throw error;
  }
};
//delete banner
export const deletebanner = async (documentId) => {
  console.log(
    "🚀 ~ file: route.js:88 ~ deletebanner ~ documentId:",
    documentId
  );
  const documentRef = doc(db, "baner", documentId);

  try {
    await deleteDoc(documentRef);
    console.log(`Document with ID ${documentId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting document:", error.message);
    throw error;
  }
};

//get single event
export const singleBanner = async (documentId) => {
  try {
    const documentRef = doc(db, "baner", documentId);
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

//update banner
export const updatebanner = async (documentId, dataToUpdate) => {
  const documentRef = doc(db, "baner", documentId);

  try {
    await updateDoc(documentRef, dataToUpdate);
    console.log(`Document with ID ${documentId} updated successfully`);
  } catch (error) {
    console.error("Error updating document:", error.message);
    throw error;
  }
};
