import express from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/category.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const router = express.Router();

router.post('/', verifyToken, createCategory);
router.get('/', verifyToken, getCategories);
router.put('/:id', verifyToken, updateCategory);
router.delete('/:id', verifyToken, deleteCategory);

export default router;
