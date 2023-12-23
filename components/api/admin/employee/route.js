import { db } from "lib/firebaseConfig";
const bcrypt = require("bcryptjs");

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

export const checkAdminExistence = async (email) => {
  try {
    const q = query(collection(db, "admin"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking admin existence:", error.message);
    throw error;
  }
};

export const createEmployee = async (data) => {
  try {
    const { email, password, ...otherData } = data;

    const adminExists = await checkAdminExistence(email);

    if (adminExists) {
      throw new Error(`Admin with email ${email} already exists.`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const employeData = {
      password: hashedPassword,
      email,
      ...otherData,
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, "admin"), employeData);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e.message);
    throw e;
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
