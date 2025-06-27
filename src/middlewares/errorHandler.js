
export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  if (process.env.NODE_ENV !== "production") {
    console.error("ERROR", err);
  }

  res.status(statusCode).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

