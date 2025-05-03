import express from 'express';
import { Router } from 'express';

import { 
  deleteTrain, 
  getAllTrips, 
  updateTrip,
  getAllTripsDetailed,
  getTripsByDateRange,
  getPopularRoutes,
  getBookingStats,
  createTrip
} from '../services/tripService.js';

const router = Router();

// Fetch all trips
router.get('/', async (req, res) => {
  try {
    const trips = await getAllTrips();
    res.status(200).json(trips);  // Return the list of trips
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ message: 'Error fetching trips' });
  }
});

// Fetch all trips with detailed data
router.get('/detailed', async (req, res) => {
  try {
    const trips = await getAllTripsDetailed();
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching detailed trips:', error);
    res.status(500).json({ message: 'Error fetching detailed trips' });
  }
});

// Fetch trips by date range
router.get('/range', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }
    
    const trips = await getTripsByDateRange(startDate, endDate);
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips by date range:', error);
    res.status(500).json({ message: 'Error fetching trips by date range' });
  }
});

// Get popular routes
router.get('/popular-routes', async (req, res) => {
  try {
    const popularRoutes = await getPopularRoutes();
    res.status(200).json(popularRoutes);
  } catch (error) {
    console.error('Error fetching popular routes:', error);
    res.status(500).json({ message: 'Error fetching popular routes' });
  }
});

// Get booking statistics
router.get('/booking-stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }
    
    const bookingStats = await getBookingStats(startDate, endDate);
    res.status(200).json(bookingStats);
  } catch (error) {
    console.error('Error fetching booking statistics:', error);
    res.status(500).json({ message: 'Error fetching booking statistics' });
  }
});

function isValidDate(dateStr) {
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}


router.post('/', async (req, res) => {
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
    } = req.body;
    console.log("Request body:", req.body);
    // Basic validation
  
  
    try {
      const trip = await createTrip({
          arriveStation,
          availableSeats,
          code,
          depStation,
          depTime,
          departureDate,
          name,
          status,
          totalSeats
      });
  
      res.status(201).json({ message: 'Trip created', trip });
    } catch (error) {
      console.error('Create trip failed:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a trip by ID
router.delete('/:tripId', async (req, res) => {
  try {
    await deleteTrain(req.params.tripId);
    res.status(200).json({ message: 'Trip deleted successfully.' });
  } catch (error) {
    console.error('Deletion error:', error);
    res.status(404).json({ message: error.message });
  }
});

// Edit a trip by ID
router.put('/:tripId', async (req, res) => {
  try {
    const { depStation, arriveStation, departureDate } = req.body;

    // Ensure all required fields are provided
    if (!depStation || !arriveStation || !departureDate) {
      return res.status(400).json({ message: 'Missing required fields: depStation, arriveStation, departureDate' });
    }

    // Update the trip using the provided trip ID and updated data
    const updatedTrip = await updateTrip(req.params.tripId, { depStation, arriveStation, departureDate });

    res.status(200).json({ message: 'Trip updated successfully.', trip: updatedTrip });
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({ message: error.message });
  }
});

export default router;