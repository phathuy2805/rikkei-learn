import * as Post from '../models/Post.js';
import * as Comment from '../models/Comment.js';
import AppError from '../utils/AppError.js';
import upload from '../middlewares/upload.js';
import multer from 'multer';

export function getPosts(req, res, next) {
  try {
    const allPosts = Post.getAll();
    res.status(200).json(allPosts);
  } catch (error) {
    next(error);
  }
}

export function createPost(req, res, next) {
  upload.single('thumbnail')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return next(new AppError('File vượt quá dung lượng cho phép (2MB)', 400));
      }
      if (err.message === 'LIMIT_UNSUPPORTED_TYPE') {
        return next(new AppError('Chỉ chấp nhận file ảnh JPEG/PNG/WEBP', 400));
      }
      return next(new AppError(err.message, 400));
    }

    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return next(new AppError('Thiếu trường title hoặc content', 400));
      }

      const thumbnailUrl = req.file ? `/uploads/${req.file.filename}` : null;
      const newPost = Post.create({ title, content, thumbnailUrl });
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  });
}

export function getPostById(req, res, next) {
  try {
    const { id } = req.params;
    const post = Post.findById(id);
    if (!post) {
      return next(new AppError('Không tìm thấy bài viết', 404));
    }
    const postComments = Comment.findByPostId(id);
    res.status(200).json({ ...post, comments: postComments });
  } catch (error) {
    next(error);
  }
}

export function deletePost(req, res, next) {
  try {
    const { id } = req.params;
    const post = Post.findById(id);
    if (!post) {
      return next(new AppError('Không tìm thấy bài viết', 404));
    }
    Post.deleteById(id);
    Comment.deleteByPostId(id);
    res.status(200).json({ success: true, message: 'Xóa bài viết và các bình luận thành công' });
  } catch (error) {
    next(error);
  }
}
