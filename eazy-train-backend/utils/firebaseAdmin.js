const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Use application default credentials
  databaseURL: "https://your-database-name.firebaseio.com",
});

module.exports = admin;  // Export the Firebase Admin instance for use in the backend
