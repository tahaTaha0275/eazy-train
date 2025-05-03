import express from 'express';
import { createTrip  } from '../services/tripService.js';

const router = express.Router();

function isValidDate(dateStr) {
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
}

// POST /trips - Create new trip
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






export default router;