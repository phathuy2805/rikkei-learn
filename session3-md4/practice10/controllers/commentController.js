import * as Comment from '../models/Comment.js';
import * as Post from '../models/Post.js';
import AppError from '../utils/AppError.js';

export function createComment(req, res, next) {
  try {
    const { postId, content } = req.body;
    if (!postId || !content) {
      return next(new AppError('Thiếu trường postId hoặc content', 400));
    }
    const post = Post.findById(postId);
    if (!post) {
      return next(new AppError('Không tìm thấy bài viết để bình luận', 404));
    }
    const newComment = Comment.create({ postId, content });
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
}

export function getComments(req, res, next) {
  try {
    const allComments = Comment.getAll();
    res.status(200).json(allComments);
  } catch (error) {
    next(error);
  }
}
