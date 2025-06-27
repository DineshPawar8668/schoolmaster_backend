import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTokens from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import HttpStatus from "../utils/httpStatus.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError("All fields are required", HttpStatus.BAD_REQUEST));

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return next(new AppError("User already exists", HttpStatus.CONFLICT));

    const user = await User.create({ email, password });
    const { accessToken, refreshToken } = generateTokens(user._id);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(HttpStatus.CREATED)
      .json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return next(new AppError("Invalid credentials", HttpStatus.UNAUTHORIZED));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new AppError("Invalid credentials", HttpStatus.UNAUTHORIZED));

    const { accessToken, refreshToken } = generateTokens(user._id);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(HttpStatus.OK)
      .json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return next(new AppError("No refresh token found", HttpStatus.UNAUTHORIZED));

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return next(new AppError("Invalid token", HttpStatus.FORBIDDEN));

      const { accessToken } = generateTokens(decoded.userId);
      res.status(HttpStatus.OK).json({ accessToken });
    });
  } catch (err) {
    next(err);
  }
};
