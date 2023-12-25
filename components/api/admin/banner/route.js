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
import { formatToLocalDate } from "widgets/utility/formateDate";

// const storage = getStorage();
// const db = getFirestore(app);

export const createBanner = async (data) => {
  try {
    const bannerData = { ...data, active: true, created_at: formatToLocalDate(new Date()) };

    const docRef = await addDoc(collection(db, "banner"), bannerData);
    return { status: "ok", docRef }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateBannerActiveFlag = async (bannerId, isActive) => {
  try {
    const bannerRef = doc(db, 'banner', bannerId);
    await updateDoc(bannerRef, { active: isActive });
  } catch (e) {
    console.error(`Error updating banner with ID ${bannerId}: `, e);
  }
};

export const uploadImages = async (file) => {
  const storageRef = ref(storage, "thalipparamb/" + file?.name);

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

export const getAllBanner = async () => {
  const q = query(collection(db, "banner"), orderBy("created_at", "desc"));
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
export const deleteBanner = async (documentId) => {

  const documentRef = doc(db, "banner", documentId);

  try {
    await deleteDoc(documentRef);
    return
  } catch (error) {
    console.error("Error deleting document:", error.message);
    throw error;
  }
};

//get single event
export const singleBanner = async (documentId) => {
  try {
    const documentRef = doc(db, "banner", documentId);
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
export const updateBanner = async (documentId, dataToUpdate) => {
  const documentRef = doc(db, "banner", documentId);

  try {
    await updateDoc(documentRef, dataToUpdate);
  } catch (error) {
    console.error("Error updating document:", error.message);
    throw error;
  }
};
