module.exports = {
  wrap(fn) {
    return async (req, res, next) => {
      // Catch any errors and pass them to the error handler
      // but also allow for adding a middleware after this one.
      try {
        // handle headersSent to skip processing immediately
        if (res.headersSent) {
          return next();
        }
        await fn(req, res);
        next();
      } catch (err) {
        next(err);
      }
    };
  },
};
