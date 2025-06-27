import express from "express";
import {
  register,
  login,
  refreshAccessToken,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refresh", refreshAccessToken);

const authRoute = router;
export default authRoute;
