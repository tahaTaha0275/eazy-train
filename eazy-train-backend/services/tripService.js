// services/tripservice.js
import admin from '../utils/firebaseAdmin.js'; // Import the initialized Firebase Admin SDK
import { getFirestore } from 'firebase-admin/firestore';
const db = getFirestore();

const VALID_STATUSES = ['on_time', 'delayed', 'canceled'];

/**
 * Creates a new trip in Firestore.
 *
 * @param {Object} tripData - The data for the new trip.
 * @returns {Promise<Object>} The newly created trip data with its generated ID.
 * @throws {Error} If validation fails or Firestore write fails.
 */
async function createTrip(tripData) {
  const {
    name,
    code,
    availableSeats,
    totalSeats,
    status,
    depStation,
    arriveStation,
    depTime,
    departureDate
  } = tripData;

  if (!name || !code || !status || !availableSeats || !totalSeats || !depStation || !arriveStation || !depTime || !departureDate) {
    throw new Error('Missing required fields.');
  }

  if (!VALID_STATUSES.includes(status)) {
    throw new Error('Invalid trip status.');
  }

  const data = {
    name,
    code,
    availableSeats: Number(availableSeats),
    totalSeats: Number(totalSeats),
    status,
    depStation,
    arriveStation,
    depTime,
    departureDate: departureDate.trim().replace(/^'+|'+$/g, ""),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  const newTripRef = await db.collection('trips').add(data);
  return { id: newTripRef.id, ...data };
}

/**
 * Retrieves a trip document by its ID.
 *
 * @param {string} tripId - The Firestore document ID of the trip.
 * @returns {Promise<Object>} The trip document data, including its ID.
 * @throws {Error} If the document doesn't exist or Firestore read fails.
 */
async function getTripById(tripId) {
  const doc = await db.collection('trips').doc(tripId).get();
  if (!doc.exists) {
    throw new Error('Trip not found.');
  }
  return { id: doc.id, ...doc.data() };
}

/**
 * Retrieves trips by departure station, arrival station, and departure date.
 *
 * @param {string} depStation
 * @param {string} arriveStation
 * @param {string} departureDate - ISO date string (e.g., "2025-05-01")
 * @returns {Promise<Object[]>} List of matching trip documents.
 */
async function getTripsByRouteAndDate(depStation, arriveStation, departureDate) {
  const snapshot = await db.collection('trips').get();
  const trips = [];

  const dep = depStation.trim().toLowerCase();
  const arr = arriveStation.trim().toLowerCase();
  const date = departureDate.trim();

  snapshot.forEach(doc => {
    const data = doc.data();

    const docDep = data.depStation?.trim().toLowerCase();
    const docArr = data.arriveStation?.trim().toLowerCase();
    const docDate = data.departureDate?.trim();

    console.log('🔍 Comparing:', { docDep, docArr, docDate });

    if (docDep === dep && docArr === arr && docDate === date) {
      trips.push({ id: doc.id, ...data });
    }
  });

  console.log('✅ Found trips:', trips.length);
  return trips;
}

export {
  createTrip,
  getTripById,
  getTripsByRouteAndDate
};
