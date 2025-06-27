import Student from "../models/student.js";
import { createStud, listStud } from "../repositories/student.repository.js";
import AppError from "../utils/appError.js";
import HttpStatus from "./../utils/httpStatus.js";

export const createStudent = async (req, res, next) => {
  try {
    const student = await createStud(req.body);
    res
      .status(HttpStatus.OK)
      .json({ message: "Student created successfuly", student });
  } catch (err) {
    next(err);
  }
};

export const listStudent = async (req, res, next) => {
  try {
    const studList = await listStud();
    res
      .status(HttpStatus.OK)
      .json({ message: "Student created successfuly", studList });
  } catch (err) {
    next(err);
  }
};
