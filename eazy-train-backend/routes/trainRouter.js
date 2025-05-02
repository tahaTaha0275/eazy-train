// routes/trains.js
// const express = require('express');
import express from 'express';
import { Router } from 'express'
// const { createTrain, getTrainById } = require('../services/trainService');
import { createTrain, getTrainById } from '../services/trainService.js'; 

const router = Router()
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
