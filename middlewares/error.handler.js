function logError (error, request, response, next) {
  console.log('first logErrors');
  console.error(error);
  next(error);
}

function errorHandler (error, request, response, next) {
  console.log('second errorHandler');
  response.status(500).json({
    message: error.message,
    stack: error.stack
  });
}

function boomErrorHandler (error, request, response, next) {
  if (error.isBoom) {
    const { output } = error;
    response.status(output.statusCode).json(output.payload);
  }
  next(error);
}

module.exports = { logError, errorHandler, boomErrorHandler }
