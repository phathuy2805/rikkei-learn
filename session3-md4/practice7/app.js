import express from 'express';
import multer from 'multer';
import fs from 'fs';

const app = express();
const uploadDir = './uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, `${Date.now()}-${cleanName}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('LIMIT_UNSUPPORTED_TYPE'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

app.post('/upload/avatar', (req, res) => {
  upload.single('avatar')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File vượt quá dung lượng cho phép (2MB)' });
      }
      if (err.message === 'LIMIT_UNSUPPORTED_TYPE') {
        return res.status(400).json({ message: 'Chỉ chấp nhận file ảnh JPEG/PNG/WEBP' });
      }
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng chọn file để upload' });
    }

    res.status(200).json({
      message: 'Upload thành công',
      filename: req.file.filename,
      size: req.file.size
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
