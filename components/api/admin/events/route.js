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
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

// const storage = getStorage();

export const createEvent = async (data) => {
  try {
    const eventData = { ...data, createdAt: new Date().toISOString() };
    const docRef = await addDoc(collection(db, "event"), eventData);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const uploadEventImages = async (file) => {
  const storageRef = ref(storage, "thalipparamb/event" + file?.name);

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

// export const getAllEvents = async () => {
//   const q = query(collection(db, "event"), orderBy("createdAt", "desc"));
//   const documents = [];

//   try {
//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach((doc) => {
//       documents.push({ id: doc.id, ...doc.data() });
//     });

//     return documents;
//   } catch (error) {
//     console.error("Error getting documents:", error.message);
//     throw error;
//   }
// };

export const getAllEvents = async (status = "all") => {
  let q;

  if (status === "all") {
    q = query(collection(db, "event"), orderBy("createdAt", "desc"));
  } else {
    q = query(
      collection(db, "event"),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
  }


  try {
    const querySnapshot = await getDocs(q);

    const events = querySnapshot.docs.map((doc) => {
      const { createdAt, scheduleDate, ...data } = doc.data();
      return { id: doc.id, ...data };
    });

    return events;
  } catch (error) {
    console.error("Error getting documents:", error.message);
    throw error;
  }
};

//delete banner
export const deleteEvent = async (documentId) => {
  const documentRef = doc(db, "event", documentId);

  try {
    await deleteDoc(documentRef);
  } catch (error) {
    console.error("Error deleting document:", error.message);
    throw error;
  }
};
//get single event
export const singleEvent = async (documentId) => {
  try {
    const documentRef = doc(db, "event", documentId);
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
export const updateEvent = async (documentId, dataToUpdate) => {
  const documentRef = doc(db, "event", documentId);

  try {
    await updateDoc(documentRef, dataToUpdate);
  } catch (error) {
    console.error("Error updating document:", error.message);
    throw error;
  }
};

export const deleteEventImage = async (imageUrl) => {
  const imageRef = ref(
    storage,
    "thalipparamb/event/" + getImageFileNameFromURL(imageUrl)
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
