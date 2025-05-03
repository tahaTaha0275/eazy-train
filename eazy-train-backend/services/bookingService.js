// services/bookingService.js
import admin from '../utils/firebaseAdmin.js';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const db = admin.firestore();

export async function cancelBooking(bookingId, userId) {
  const bookingRef = db.collection('bookings').doc(bookingId);
  const doc = await bookingRef.get();

  if (!doc.exists) {
    throw new Error('Booking not found');
  }

  // Verify the booking belongs to the user
  if (doc.data().userId !== userId) {
    throw new Error('Unauthorized');
  }

  // Update the booking status instead of deleting
  await bookingRef.update({
    status: 'cancelled',
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return { success: true };
}

// ... existing getBookingsByUserId function ...
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

/**
 * Creates a new booking in Firestore.
 *
 * @param {Object} bookingData - Data for the new booking.
 * @param {string} bookingData.name - Name of the passenger.
 * @param {string} bookingData.contact - Passenger's contact number.
 * @param {string} bookingData.tripId - Trip document ID (not the full path).
 * @param {string} bookingData.userId - ID of the user making the booking.
 * @param {number} bookingData.amount - Amount paid.
 * @param {string} bookingData.method - Payment method (e.g., 'mada', 'visa').
 *
 * @returns {Promise<Object>} The newly created booking document with ID.
 */
export async function createBooking({
  name,
  contact,
  tripId,
  userId,
  amount,
  method
}) {
  if (!name || !contact || !tripId ||  !userId || !amount || !method) {
    throw new Error("Missing required booking fields.");
  }

  const now = admin.firestore.FieldValue.serverTimestamp();

  const data = {
    bookedAt: now,
    updatedAt: now,
    userId: userId,
    tripId: `/trips/${tripId}`,
    status: 'confirmed',
    passengerInfo: {
      name,
      contact
    },
    payment: {
      amount: Number(amount),
      method,
      paidAt: now
    }
  };

  const newBookingRef = await db.collection('bookings').add(data);
  return { id: newBookingRef.id, ...data };
}

