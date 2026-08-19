import express from 'express';
import { getPosts, createPost, getPostById, deletePost } from '../controllers/postController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPostById);
router.delete('/:id', authenticate, authorize('admin'), deletePost);

export default router;
