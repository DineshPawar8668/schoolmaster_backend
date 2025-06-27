const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const HttpStatus = require("../utils/httpStatusCodes");

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return next(new AppError("Not authorized", HttpStatus.UNAUTHORIZED));

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError("Invalid/Expired token", HttpStatus.UNAUTHORIZED));
  }
};
