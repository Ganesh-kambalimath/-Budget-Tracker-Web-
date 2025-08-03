import express from 'express';
import { createBudget, getBudgets, updateBudget, deleteBudget, getBudgetSummary } from '../controllers/budget.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const router = express.Router();

router.post('/', verifyToken, createBudget);
router.get('/', verifyToken, getBudgets);
router.get('/summary', verifyToken, getBudgetSummary); 
router.put('/:id', verifyToken, updateBudget);
router.delete('/:id', verifyToken, deleteBudget);

export default router;
