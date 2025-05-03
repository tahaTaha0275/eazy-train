import admin from '../utils/firebaseAdmin.js'; // Import the initialized Firebase Admin SDK
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const db = getFirestore();

/**
 * Creates a new trip document in Firestore.
 *
 * @param {Object} tripData - Trip data from request body.
 * @param {string} tripData.train - Firestore train document ID.
 * @param {string} tripData.from - Departure city.
 * @param {string} tripData.to - Destination city.
 * @param {string} tripData.date - ISO date string (e.g., 2025-05-01).
 * @param {number} tripData.ticketPrice - Price of the ticket.
 * @param {string} tripData.tripNumber - Unique trip code.
 * @param {string} [tripData.operatorId] - Firestore user ID reference.
 * @returns {Promise<Object>} Newly created trip document with ID.
 */
async function createTrip(tripData) {
  const {
    arriveStation,
    availableSeats,
    code,
    depStation,
    depTime,
    departureDate,
    name,
    status,
    totalSeats
  } = tripData;
  console.log("Request body:", tripData);
  if (
    !arriveStation || !availableSeats || !code || !depStation || !depTime || !departureDate || !name || !status || !totalSeats) { 
    throw new Error('Missing required fields.');
  }

  const trip = {
    arriveStation,
    availableSeats: Number(availableSeats),
    code,
    depStation,
    depTime,
    departureDate: departureDate.trim().replace(/^'+|'+$/g, ""),
    name,
    status,
    totalSeats: Number(totalSeats),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  const newTripRef = await db.collection('trips').add(trip);
  return { id: newTripRef.id, ...trip };
}


export { createTrip };