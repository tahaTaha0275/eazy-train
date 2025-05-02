import admin from "firebase-admin";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load and parse JSON manually
const serviceAccount = JSON.parse(
  readFileSync(path.join(__dirname, "../serviceAccountKey.json"), "utf8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://eazytrain-b2a5d.firebaseio.com",
  });
}

export default admin;
