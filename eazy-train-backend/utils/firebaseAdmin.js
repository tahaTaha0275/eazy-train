import admin  from "firebase-admin";
import{ cert } from "firebase-admin/app";
// Initialize Firebase Admin SDK
import  serviceAccount from "../serviceAccountKey.json" assert { type: "json" };
admin.initializeApp({
  credential: cert(serviceAccount), // Use application default credentials
  databaseURL: "https://eazytrain-b2a5d.firebaseio.com",
});

export  default admin;  // Export the Firebase Admin instance for use in the backend

