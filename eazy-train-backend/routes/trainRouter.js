// routes/trains.js
import express from 'express';
import { Router } from 'express';
const router = Router();
// const { createTrain, getTrainById } = require('../services/trainService');
import { createTrain, getTrainById ,getTrainsByRouteAndDate } from '../services/trainService.js'; 

// Create a train
router.post('/', async (req, res) => {
  try {
    const train = await createTrain(req.body);
    res.status(201).json({ message: 'Train created', train });
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
    const trains = await getTrainsByRouteAndDate(depStation, arrivStation, departureDate);
    console.log(trains)
    res.status(200).json(trains);
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ message: 'Failed to retrieve trains.' });
  }
});
// Get a train by ID
router.get('/:trainId', async (req, res) => {
  try {
    const train = await getTrainById(req.params.trainId);
    res.status(200).json(train);
  } catch (error) {
    console.error('Retrieval error:', error);
    res.status(404).json({ message: error.message });
  }
});



export default router;
