// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, increment, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHSTmaxRSQ1xSeONKO6Cs-1DZ0KidolbE",
  authDomain: "bulsuhandbook.firebaseapp.com",
  projectId: "bulsuhandbook",
  storageBucket: "bulsuhandbook.firebasestorage.app",
  messagingSenderId: "380935414348",
  appId: "1:380935414348:web:6bab07fc736ed5d5dd8ae9",
  measurementId: "G-9CR68509D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to get download count
export const getDownloadCount = async () => {
  try {
    const docRef = doc(db, "stats", "downloads");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().count || 0;
    } else {
      // Initialize the document if it doesn't exist
      await setDoc(docRef, { count: 0 });
      return 0;
    }
  } catch (error) {
    console.error("Error getting download count:", error);
    return 0;
  }
};

// Function to increment download count
export const incrementDownloadCount = async () => {
  try {
    const docRef = doc(db, "stats", "downloads");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        count: increment(1)
      });
    } else {
      // Initialize with count 1 if document doesn't exist
      await setDoc(docRef, { count: 1 });
    }
    return true; // Success
  } catch (error) {
    console.error("Error incrementing download count:", error);
    // Don't throw - allow the download to proceed even if tracking fails
    return false; // Failure, but don't block the download
  }
};
