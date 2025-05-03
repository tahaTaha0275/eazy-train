import { updateUserById } from "../services/userService.js";
import { getUserPhoneById,getUserById } from '../services/userService.js';
import Router from "express";

const router = Router();

// PUT /users/:userId
router.put('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    const updatedUser = await updateUserById(userId, updates);
    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    console.error('Update user error:', error.message);
    res.status(400).json({ message: error.message });
  }
});


router.get('/phone/:userId', async (req, res) => {
  try {
    const phone = await getUserPhoneById(req.params.userId);
    res.json({ phone });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
