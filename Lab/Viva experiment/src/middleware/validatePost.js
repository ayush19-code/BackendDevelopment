/**
 * Middleware to validate Blog Post input data before saving to MongoDB
 */
const validatePost = (req, res, next) => {
  const { title, content, author } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.push('Title is required and cannot be empty.');
  }

  if (!content || typeof content !== 'string' || content.trim() === '') {
    errors.push('Content is required and cannot be empty.');
  }

  if (!author || typeof author !== 'string' || author.trim() === '') {
    errors.push('Author is required and cannot be empty.');
  }

  if (errors.length > 0) {
    const isApiRoute = req.originalUrl.startsWith('/api');

    if (isApiRoute || req.accepts('json') && !req.accepts('html')) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    // Render create view with error message and preserved form fields
    return res.status(400).render('create', {
      title: 'Create New Post - Simple CMS',
      error: errors.join(' '),
      formData: { title: title || '', content: content || '', author: author || '' }
    });
  }

  next();
};

module.exports = validatePost;
