// services/trainService.js
import admin from '../utils/firebaseAdmin.js'; // Import the initialized Firebase Admin SDK
import { getFirestore } from 'firebase-admin/firestore';
const db = getFirestore();

const VALID_STATUSES = ['on_time', 'delayed', 'canceled'];

/**
 * Creates a new train in Firestore.
 *
 * @param {Object} trainData - The data for the new train.
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
    currentTripId,
    depStation,
    arrivStation,
    depTime,
    departureDate
  } = trainData;

  if (!name || !code || !status || !availableSeats || !totalSeats || !currentTripId || !depStation || !arrivStation || !depTime || !departureDate) {
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
    depStation,
    arrivStation,
    depTime,
    departureDate: departureDate.trim().replace(/^'+|'+$/g, ""),
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

/**
 * Retrieves trains by departure station, arrival station, and departure date.
 *
 * @param {string} depStation
 * @param {string} arrivStation
 * @param {string} departureDate - ISO date string (e.g., "2025-05-01")
 * @returns {Promise<Object[]>} List of matching train documents.
 */
async function getTrainsByRouteAndDate(depStation, arrivStation, departureDate) {
  const snapshot = await db.collection('trains').get();
  const trains = [];
  const dep = depStation.trim().toLowerCase();
  const arr = arrivStation.trim().toLowerCase();
  const date = departureDate.trim();

  snapshot.forEach(doc => {
    const data = doc.data();

    const docDep = data.depStation?.trim().toLowerCase();
    const docArr = data.arrivStation?.trim().toLowerCase();
    const docDate = data.departureDate?.trim();

    console.log('🔍 Comparing:', { docDep, docArr, docDate });

    if (docDep === dep && docArr === arr && docDate === date) {
      trains.push({ id: doc.id, ...data });
    }
  });

  console.log('✅ Found trains:', trains.length);
  return trains;
}

export {
  createTrain,
  getTrainById,
  getTrainsByRouteAndDate
};
