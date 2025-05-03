// services/bookingService.js
import admin from '../utils/firebaseAdmin.js';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const db = getFirestore();

/**
 * Fetch all bookings for a given userId.
 * @param {string} userId  // this is the same `id` you sign into the JWT
 * @returns {Promise<Object[]>}
 */
export async function getBookingsByUserId(userId) {
  const snapshot = await db
    .collection('bookings')
    .where('userId', '==', userId)
    .get();

  const bookings = [];
  snapshot.forEach(doc => {
    bookings.push({
      bookingId: doc.id,
      ...doc.data()
    });
  });

  return bookings;
}
