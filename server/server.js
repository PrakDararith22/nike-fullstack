import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRouter from "./module/auth/route.js";
import productRouter from "./module/products/router.js";

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(cookieParser());
app.use(express.json());
app.set("query parser", "extended");
app.use(morgan("dev"));
app.use(userRouter);
app.use(productRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(PORT, () => {
  console.log(`successfully connected to PORT ${PORT}`);
});
