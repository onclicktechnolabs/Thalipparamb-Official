import { db } from "lib/firebaseConfig";

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

export const createEmploye = async (data) => {
  try {
    const employeData = { ...data, createdAt: serverTimestamp() };
    const docRef = await addDoc(collection(db, "admin"), employeData);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAllEmployes = async () => {
  const q = query(collection(db, "admin"), orderBy("createdAt", "desc"));
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

export const deleteEmploye = async (documentId) => {
  const documentRef = doc(db, "admin", documentId);

  try {
    await deleteDoc(documentRef);
  } catch (error) {
    console.error("Error deleting document:", error.message);
    throw error;
  }
};

export const singleEmploye = async (documentId) => {
  try {
    const documentRef = doc(db, "admin", documentId);
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      const employeData = docSnap.data();
      return employeData;
    }
  } catch (error) {
    console.error("Error fetching single document:", error.message);
    throw error;
  }
};

export const updateEmploye = async (documentId, dataToUpdate) => {
  const documentRef = doc(db, "admin", documentId);

  try {
    await updateDoc(documentRef, dataToUpdate);
  } catch (error) {
    console.error("Error updating document:", error.message);
    throw error;
  }
};
