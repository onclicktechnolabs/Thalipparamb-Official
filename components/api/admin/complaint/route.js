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
import { formatToLocalDate } from "widgets/utility/formateDate";

// const storage = getStorage();

export const createComplaint = async (data) => {
  try {
    const ComplaintData = { ...data, created_at: formatToLocalDate(new Date()) };
    const docRef = await addDoc(collection(db, "complaint"), ComplaintData);

    return { status: "ok", docRef: docRef };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { status: "error", error: e.message };
  }
};
export const uploadComplaintImages = async (file) => {
  const storageRef = ref(storage, "thalipparamb/complaint" + file?.name);

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

export const getAllComplaints = async () => {
  const q = query(collection(db, "complaint"), orderBy("created_at", "desc"));
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
//delete complaints
export const deleteComplaint = async (documentId) => {
  const documentRef = doc(db, "complaint", documentId);

  try {
    await deleteDoc(documentRef);
  } catch (error) {
    console.error("Error deleting document:", error.message);
    throw error;
  }
};
//get single complaint
export const singleComplaint = async (documentId) => {
  try {
    const documentRef = doc(db, "complaint", documentId);
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
//update complaints
export const updateComplaint = async (documentId, dataToUpdate) => {
  const documentRef = doc(db, "complaint", documentId);

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
    "thalipparamb/complaint/" + getImageFileNameFromURL(imageUrl)
  );

  try {
    // Delete the file
    await deleteObject(imageRef);
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
