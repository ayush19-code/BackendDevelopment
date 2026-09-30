/**
 * 404 Not Found Middleware
 */
const notFoundHandler = (req, res, next) => {
  const isApiRoute = req.originalUrl.startsWith('/api');

  if (isApiRoute) {
    return res.status(404).json({
      success: false,
      message: `Resource not found at ${req.originalUrl}`
    });
  }

  res.status(404).render('error', {
    title: '404 - Page Not Found',
    statusCode: 404,
    message: 'The page you are looking for does not exist.'
  });
};

/**
 * Centralized Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[Error]: ${err.stack || err.message}`);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const isApiRoute = req.originalUrl.startsWith('/api');

  if (isApiRoute || (req.accepts('json') && !req.accepts('html'))) {
    return res.status(statusCode).json({
      success: false,
      message: message
    });
  }

  res.status(statusCode).render('error', {
    title: `${statusCode} - Server Error`,
    statusCode: statusCode,
    message: message
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
