// services/trainService.js
import admin from '../utils/firebaseAdmin.js'; // Import the initialized Firebase Admin SDK
import { getFirestore } from 'firebase-admin/firestore';
const db = getFirestore();

const VALID_STATUSES = ['on_time', 'delayed', 'canceled'];

/**
 * Creates a new train in Firestore.
 *
 * @param {Object} trainData - The data for the new train.
 * @param {string} trainData.name - Name of the train.
 * @param {string} trainData.code - Unique train code.
 * @param {number} trainData.availableSeats - Number of available seats.
 * @param {number} trainData.totalSeats - Total number of seats.
 * @param {string} trainData.status - Status of the train ("on_time", "delayed", "canceled").
 * @param {string} trainData.currentTripId - Firestore document ID for the related trip.
 *
 * @returns {Promise<Object>} The newly created train data with its generated ID.
 * @throws {Error} If validation fails or Firestore write fails.
 */

async function createTrain(trainData) {
  const {
    name,
    code,
    availableSeats,
    totalSeats,
    status,
    currentTripId
  } = trainData;

  if (!name || !code || !status || !availableSeats || !totalSeats || !currentTripId) {
    throw new Error('Missing required fields.');
  }

  if (!VALID_STATUSES.includes(status)) {
    throw new Error('Invalid train status.');
  }

  const data = {
    name,
    code,
    availableSeats: Number(availableSeats),
    totalSeats: Number(totalSeats),
    status,
    currentTripId: db.doc(`trips/${currentTripId}`),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  const newTrainRef = await db.collection('trains').add(data);
  return { id: newTrainRef.id, ...data };
}



/**
 * Retrieves a train document by its ID.
 *
 * @param {string} trainId - The Firestore document ID of the train.
 *
 * @returns {Promise<Object>} The train document data, including its ID.
 * @throws {Error} If the document doesn't exist or Firestore read fails.
 */



async function getTrainById(trainId) {
  const doc = await db.collection('trains').doc(trainId).get();
  if (!doc.exists) {
    throw new Error('Train not found.');
  }
  return { id: doc.id, ...doc.data() };
}


export  {
  createTrain,
  getTrainById,
  
};


