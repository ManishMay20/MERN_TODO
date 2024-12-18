import express from "express";
import dotenv from "dotenv";
import {
  Authenticate,
  Signin,
  Signup,
} from "../controllers/authControllers.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.get("/authenticate", Authenticate);

router.post("/signin", Signin);

router.post("/signup", Signup);

export default router;
