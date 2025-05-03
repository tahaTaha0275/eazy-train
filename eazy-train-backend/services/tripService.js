import admin from '../utils/firebaseAdmin.js'; // Import the initialized Firebase Admin SDK
import { getFirestore } from 'firebase-admin/firestore';
const db = getFirestore();

/**
 * Updates a trip document by its ID with the provided new data (only depStation, arriveStation, and departureDate).
 *
 * @param {string} tripID - The Firestore document ID of the trip to update.
 * @param {Object} updatedData - The data to update the trip with.
 * @param {string} updatedData.depStation - New departure city.
 * @param {string} updatedData.arriveStation - New arrival city.
 * @param {string} updatedData.departureDate - New departure date.
 *
 * @returns {Promise<Object>} The updated trip data.
 * @throws {Error} If the trip does not exist or Firestore update fails.
 */
async function updateTrip(tripID, updatedData) {
    try {
        // Reference to the trip document
        const tripRef = db.collection('trips').doc(tripID);
        const doc = await tripRef.get();

        if (!doc.exists) {
            throw new Error('Trip not found.');
        }

        // Update the trip document with the new data
        await tripRef.update({
            depStation: updatedData.depStation,        // Update departure city
            arriveStation: updatedData.arriveStation,  // Update arrival city
            departureDate: updatedData.departureDate,  // Update departure date
            updatedAt: admin.firestore.FieldValue.serverTimestamp(), // Set updated timestamp
        });

        // Return the updated trip data
        return {
            id: tripID,
            ...updatedData,
        };
    } catch (error) {
        throw new Error('Error updating trip: ' + error.message);
    }
}

/**
 * Retrieves all trips from the 'trips' collection.
 *
 * @returns {Promise<Array>} An array of trips.
 */
async function getAllTrips() {
    try {
        const tripsSnapshot = await db.collection('trips').get();

        const trips = tripsSnapshot.docs.map(doc => {
            const tripData = doc.data();
            return {
                id: doc.id,
                from: tripData.depStation,
                to: tripData.arriveStation,
            };
        });

        return trips;
    } catch (error) {
        throw new Error('Error fetching trips: ' + error.message);
    }
}

/**
 * Deletes a trip document by its ID.
 *
 * @param {string} tripID - The Firestore document ID of the trip to delete.
 *
 * @returns {Promise<void>}
 * @throws {Error} If the document doesn't exist or Firestore delete fails.
 */
async function deleteTrain(tripID) {
    const trainRef = db.collection('trips').doc(tripID);
    const doc = await trainRef.get();

    if (!doc.exists) {
        throw new Error('Trip not found.');
    }

    await trainRef.delete();
}

/**
 * Retrieves all trips with full data from the 'trips' collection.
 * 
 * @returns {Promise<Array>} An array of trips with complete data.
 */
async function getAllTripsDetailed() {
    try {
        const tripsSnapshot = await db.collection('trips').get();

        const trips = tripsSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });

        return trips;
    } catch (error) {
        throw new Error('Error fetching detailed trips: ' + error.message);
    }
}

/**
 * Retrieves trips within a specific date range.
 * 
 * @param {string} startDate - The start date in ISO format (YYYY-MM-DD)
 * @param {string} endDate - The end date in ISO format (YYYY-MM-DD)
 * @returns {Promise<Array>} An array of trips within the date range
 */
async function getTripsByDateRange(startDate, endDate) {
    try {
        const tripsSnapshot = await db.collection('trips')
            .where('departureDate', '>=', startDate)
            .where('departureDate', '<=', endDate)
            .get();

        const trips = tripsSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });

        return trips;
    } catch (error) {
        throw new Error('Error fetching trips by date range: ' + error.message);
    }
}

/**
 * Gets popular routes based on the frequency of trips between stations.
 * 
 * @returns {Promise<Array>} An array of popular routes with counts
 */
async function getPopularRoutes() {
    try {
        const tripsSnapshot = await db.collection('trips').get();
        const routeCounts = {};

        tripsSnapshot.docs.forEach(doc => {
            const tripData = doc.data();
            const routeKey = `${tripData.depStation}-${tripData.arriveStation}`;
            
            if (!routeCounts[routeKey]) {
                routeCounts[routeKey] = {
                    name: routeKey,
                    value: 0
                };
            }
            
            routeCounts[routeKey].value++;
        });

        // Convert to array and sort by popularity (descending)
        const popularRoutes = Object.values(routeCounts)
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // Get top 5 routes

        return popularRoutes;
    } catch (error) {
        throw new Error('Error getting popular routes: ' + error.message);
    }
}

/**
 * Gets booking statistics grouped by date.
 * 
 * @param {string} startDate - The start date in ISO format (YYYY-MM-DD)
 * @param {string} endDate - The end date in ISO format (YYYY-MM-DD)
 * @returns {Promise<Array>} An array of booking statistics by date
 */
async function getBookingStats(startDate, endDate) {
    try {
        const tripsSnapshot = await db.collection('trips')
            .where('departureDate', '>=', startDate)
            .where('departureDate', '<=', endDate)
            .get();

        const bookingStatsByDate = {};

        tripsSnapshot.docs.forEach(doc => {
            const tripData = doc.data();
            const date = tripData.departureDate;
            
            if (!bookingStatsByDate[date]) {
                bookingStatsByDate[date] = {
                    date: date,
                    bookings: 0,
                    revenue: 0
                };
            }
            
            // Count as one booking
            bookingStatsByDate[date].bookings++;
            
            // Calculate estimated revenue
            const seatsBooked = tripData.totalSeats - tripData.availableSeats;
            const averageTicketPrice = 100; // Placeholder, adjust as needed
            bookingStatsByDate[date].revenue += seatsBooked * averageTicketPrice;
        });

        // Convert to array and sort by date
        return Object.values(bookingStatsByDate).sort((a, b) => 
            new Date(a.date) - new Date(b.date)
        );
    } catch (error) {
        throw new Error('Error getting booking statistics: ' + error.message);
    }
}

export {
    deleteTrain,
    getAllTrips,
    getAllTripsDetailed, // New function for detailed trip data
    getTripsByDateRange, // New function for date range filtering
    getPopularRoutes,    // New function for popular routes
    getBookingStats,     // New function for booking statistics
    updateTrip,          // Export the updateTrip function for editing trips
};