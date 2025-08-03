import express from 'express';
import { createTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction } from '../controllers/transaction.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const router = express.Router();

router.post('/', verifyToken, createTransaction);
router.get('/', verifyToken, getTransactions);
router.get('/:id', verifyToken, getTransactionById);
router.put('/:id', verifyToken, updateTransaction);
router.delete('/:id', verifyToken, deleteTransaction);

export default router;
