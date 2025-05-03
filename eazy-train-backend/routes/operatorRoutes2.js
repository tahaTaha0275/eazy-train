// routes/operatorRouter.js
import express from 'express';
import { getAllOperators, createOperator, deleteOperator, updateOperator} from '../services/operatorService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const operators = await getAllOperators();
    res.status(200).json(operators);
  } catch (error) {
    console.error('Failed to get operators:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const operator = await createOperator(req.body);
    res.status(201).json(operator);
  } catch (err) {
    console.error('Create operator error:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// delete operator by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteOperator(id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to delete operator:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// update operator by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateOperator(id, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to update operator:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
