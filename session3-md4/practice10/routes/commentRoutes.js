import express from 'express';
import { createComment, getComments } from '../controllers/commentController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, createComment);
router.get('/', getComments);

export default router;
