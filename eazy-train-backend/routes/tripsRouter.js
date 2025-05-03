import { Router } from 'express'
import { createTrip, getTripById ,getTripsByRouteAndDate } from '../services/tripService.js'; 

const router = Router()
router.post('/', async (req, res) => {
  try {
    const trip = await createTrip(req.body);
    res.status(201).json({ message: 'Trip created', trip });
  } catch (error) {
    console.error('Create error:', error);
    res.status(400).json({ message: error.message });
  }
});
router.get('/search', async (req, res) => {
  const { depStation, arrivStation, departureDate } = req.query;

  if (!depStation || !arrivStation || !departureDate) {
    return res.status(400).json({ message: 'Missing query parameters.' });
  }

  try {
    const trips = await getTripsByRouteAndDate(depStation, arrivStation, departureDate);
    console.log(trips)
    res.status(200).json(trips);
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ message: 'Failed to retrieve trips.' });
  }
});
// Get a trip by ID
router.get('/:tripId', async (req, res) => {
  try {
    const trip = await getTripById(req.params.tripId);
    res.status(200).json(trip);
  } catch (error) {
    console.error('Retrieval error:', error);
    res.status(404).json({ message: error.message });
  }
});




export default router;
