export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

export const errorHandler = (error, req, res, _next) => {
  const status = error.status || 500;
  const details = error.details || undefined;

  if (status >= 500) {
    console.error(error);
  }

  res.status(status).json({
    message: status >= 500 ? 'Internal server error' : error.message,
    details,
  });
};
