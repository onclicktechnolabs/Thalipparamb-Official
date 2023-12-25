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
import { formatToLocalDate } from "widgets/utility/formateDate";

// const storage = getStorage();

export const createGreetings = async (data) => {
  try {
    const GreetingsData = { ...data, created_at: formatToLocalDate(new Date()) };
    const docRef = await addDoc(collection(db, "greetings"), GreetingsData);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const uploadGreetingsImages = async (file) => {
  const storageRef = ref(storage, "thalipparamb/greetings" + file?.name);

  try {
    const snapshot = await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
};

export const getAllGreetingss = async () => {

  const q = query(collection(db, "greetings"), orderBy("created_at", "desc"));
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
//delete greetingss
export const deleteGreetings = async (documentId) => {
  const documentRef = doc(db, "greetings", documentId);

  try {
    await deleteDoc(documentRef);
  } catch (error) {
    console.error("Error deleting document:", error.message);
    throw error;
  }
};
//get single Greetings
export const singleGreetings = async (documentId) => {
  try {
    const documentRef = doc(db, "greetings", documentId);
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      const GreetingsData = docSnap.data();
      return GreetingsData;
    }
  } catch (error) {
    console.error("Error fetching single document:", error.message);
    throw error;
  }
};

//find greetings with greeting Type
export const getSingleGreetingByGreetingType = async (greetingType) => {
  try {
    const greetingsCollection = collection(db, "greetings");
    const q = query(
      greetingsCollection,
      where("greetingType", "==", greetingType)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      return null;
    }

    const greetingData = querySnapshot.docs[0].data();
    return greetingData;
  } catch (error) {
    console.error("Error fetching greeting: ", error);
    throw error;
  }
};
