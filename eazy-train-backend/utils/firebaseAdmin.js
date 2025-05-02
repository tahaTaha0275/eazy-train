import admin  from "firebase-admin";
import{ cert } from "firebase-admin/app";
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf-8'));

// Initialize Firebase Admin SDK
// import  serviceAccount from "../serviceAccountKey.json" assert { type: "json" };
admin.initializeApp({
  credential: cert(serviceAccount), // Use application default credentials
  databaseURL: "https://eazytrain-b2a5d.firebaseio.com",
});

export  default admin;  // Export the Firebase Admin instance for use in the backend

