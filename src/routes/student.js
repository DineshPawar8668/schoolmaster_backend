import express from "express";
import { createStudent, listStudent } from "../controllers/student.js";
const router = express.Router();

router.post("/", createStudent);
router.get("/", listStudent);

export default router;
