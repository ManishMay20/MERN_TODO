import express from "express";
import authRouter from "./routes/auth.js";
import todoRouter from "./routes/todo.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/todos", todoRouter);

export default app;
