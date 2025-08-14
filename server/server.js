import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRouter from "./module/auth/route.js";

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(PORT, () => {
  console.log(`successfully connected to PORT ${PORT}`);
});
