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
