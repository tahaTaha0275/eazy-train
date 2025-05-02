// utils/firebaseAdmin.js
import admin from "firebase-admin";
import path from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the service account JSON
const serviceAccountPath = path.join(__dirname, "../serviceAccountKey.json");
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf8"));

// Initialize Firebase only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://eazytrain-b2a5d.firebaseio.com",
  });
}

export default admin;
