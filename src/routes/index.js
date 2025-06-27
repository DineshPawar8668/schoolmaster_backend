import express from "express";
import  studentRoute  from './student.js';
import authRoute from "./auth.js";
const router = express.Router();

// Define routes here
router.use("/auth",authRoute);
router.use("/student",studentRoute);


export default router;