import express from 'express';
import { generateMonthlyReport } from '../controllers/report.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const router = express.Router();

router.get('/', verifyToken, generateMonthlyReport); 

export default router;
