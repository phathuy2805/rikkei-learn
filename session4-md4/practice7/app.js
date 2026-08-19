import express from 'express';
import books from './data/books.js';
import versionResolver from './middlewares/versionResolver.js';

const app = express();
app.use(express.json());
app.use(versionResolver);

app.get('/api/books', (req, res) => {
  const version = req.apiVersion.toLowerCase();

  if (version === 'v1') {
    res.set({
      'Deprecation': 'true',
      'Sunset': 'Wed, 31 Dec 2025 23:59:59 GMT'
    });
    
    const formatted = books.map(b => ({
      id: b.id,
      title: b.title,
      author: b.author.name
    }));

    return res.status(200).json({
      success: true,
      data: formatted
    });
  }

  if (version === 'v2') {
    const formatted = books.map(b => ({
      id: b.id,
      title: b.title,
      author: {
        id: b.author.id,
        name: b.author.name
      },
      publishedYear: b.publishedYear
    }));

    return res.status(200).json({
      success: true,
      data: formatted
    });
  }

  return res.status(400).json({
    success: false,
    code: 'UNSUPPORTED_API_VERSION',
    message: `API version ${req.apiVersion} is not supported`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
