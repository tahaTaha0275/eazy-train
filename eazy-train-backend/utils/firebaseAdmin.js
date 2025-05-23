// utils/firebaseAdmin.js
import admin from "firebase-admin";
import path from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { cert } from "firebase-admin/app"; // Import the cert function from firebase-admin/app

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the service account JSON
const serviceAccountPath = path.join(__dirname, "../serviceAccountKey.json");
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf8"));

// Initialize Firebase Admin SDK
// import  serviceAccount from "../serviceAccountKey.json" assert { type: "json" };
admin.initializeApp({
  credential: cert(serviceAccount), // Use application default credentials
  databaseURL: "https://eazytrain-b2a5d.firebaseio.com",
});

const db = admin.firestore();

export default admin;  // Export the Firebase Admin instance for use in the backend

