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

export const createComplaint = async (data) => {
  try {
    const ComplaintData = { ...data, createdAt: serverTimestamp() };
    const docRef = await addDoc(collection(db, "Complaint"), ComplaintData);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const uploadComplaintImages = async (file) => {
  const storageRef = ref(storage, "thalipparamb/Complaint" + file?.name);

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

export const getAllComplaints = async () => {
  console.log("Called getAllComplaints");

  const q = query(collection(db, "Complaint"), orderBy("createdAt", "desc"));
  const documents = [];

  try {
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    console.log(
      "🚀 ~ file: route.js:69 ~ getAllComplaints ~ documents:",
      documents
    );
    return documents;
  } catch (error) {
    console.error("Error getting documents:", error.message);
    throw error;
  }
};
//delete banner
export const deleteComplaint = async (documentId) => {
  const documentRef = doc(db, "Complaint", documentId);

  try {
    await deleteDoc(documentRef);
  } catch (error) {
    console.error("Error deleting document:", error.message);
    throw error;
  }
};
//get single Complaint
export const singleComplaint = async (documentId) => {
  try {
    const documentRef = doc(db, "Complaint", documentId);
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      const ComplaintData = docSnap.data();
      return ComplaintData;
    }
  } catch (error) {
    console.error("Error fetching single document:", error.message);
    throw error;
  }
};
//update banner
export const updateComplaint = async (documentId, dataToUpdate) => {
  const documentRef = doc(db, "Complaint", documentId);

  try {
    await updateDoc(documentRef, dataToUpdate);
  } catch (error) {
    console.error("Error updating document:", error.message);
    throw error;
  }
};

export const deleteComplaintImage = async (imageUrl) => {
  const imageRef = ref(
    storage,
    "thalipparamb/Complaint/" + getImageFileNameFromURL(imageUrl)
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
