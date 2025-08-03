import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';
import { checkDuplicateUsernameOrEmail } from '../middleware/verifySignUp.js'; 

const router = express.Router();

router.post('/signup', checkDuplicateUsernameOrEmail, signup); 
router.post('/signin', signin); 

export default router;
