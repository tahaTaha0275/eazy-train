import { updateUserById } from "../services/userService.js";
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

export default router;
