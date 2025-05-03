// routes/myBookingsRouter.js
import dotenv from 'dotenv';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getBookingsByUserId } from '../services/bookingService.js';

dotenv.config();
const SECRET = process.env.JWT_SECRET;
const myBookingsRouter = Router();

myBookingsRouter.get('/', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1].trim();
  try {
    const { id: userId } = jwt.verify(token, SECRET);
    const bookings = await getBookingsByUserId(userId);
    return res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
});

export default myBookingsRouter;
