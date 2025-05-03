import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { cancelBooking } from '../services/bookingService.js';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.JWT_SECRET;
const bookingsRouter = Router();

bookingsRouter.delete('/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1].trim();
    const { id: userId } = jwt.verify(token, SECRET);
    const bookingId = req.params.id;

    await cancelBooking(bookingId, userId);
    res.json({ success: true });

  } catch (err) {
    console.error('Error cancelling booking:', err);
    
    if (err.message === 'Unauthorized') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    if (err.message === 'Booking not found') {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

export default bookingsRouter;