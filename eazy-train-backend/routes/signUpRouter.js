import dotenv from 'dotenv';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, userExistsByEmail } from '../services/userService.js';

dotenv.config();
const SECRET = process.env.JWT_SECRET;
const signUpRouter = Router();

signUpRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const exists = await userExistsByEmail(username);

    if (exists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUserId = Date.now().toString(); // use UUID in production
    const newUser = await createUser(newUserId, {
      name: '',                // Fill in real name if available
      email: username,
      password,
      role: 'passenger'
    });

    const token = jwt.sign(
      { id: newUser.id, username: newUser.email, role: newUser.role },
      SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({ token });

  } catch (err) {
    console.error('Signup error:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default signUpRouter;
