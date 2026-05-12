class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleCastError = () => new AppError('Invalid resource ID', 400);

const handleValidationError = (error) => {
  const messages = Object.values(error.errors).map((value) => value.message);
  return new AppError(messages.join(', '), 400);
};

const sendErrorDev = (error, res) => {
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
    error,
    stack: error.stack,
  });
};

const sendErrorProd = (error, res) => {
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Something went wrong',
  });
};

const errorMiddleware = (error, req, res, next) => {
  let err = { ...error };
  err.message = error.message;

  if (error.name === 'CastError') {
    err = handleCastError(error);
  }

  if (error.name === 'ValidationError') {
    err = handleValidationError(error);
  }

  if (error.code === 11000) {
    err = new AppError('Duplicate field value entered', 400);
  }

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  }

  return sendErrorProd(err, res);
};

module.exports = {
  AppError,
  errorMiddleware,
};
