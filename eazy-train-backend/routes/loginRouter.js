import dotenv from 'dotenv';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmailAndPassword } from '../services/userService.js';

dotenv.config();
const SECRET = process.env.JWT_SECRET;
const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const currentUser = await findUserByEmailAndPassword(username, password);

    if (!currentUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: currentUser.id,
        username: currentUser.email,
        role: currentUser.role
      },
      SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });

  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default loginRouter;