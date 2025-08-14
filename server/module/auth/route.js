import express from "express";
import {
  registerUserController,
  deleteUserController,
  loginController,
  verifyOptController,
} from "./controller.js";
import { authenticate } from "../../middleware/jwtAuth.js";

const userRouter = express.Router();

userRouter.post("/api/users/register", registerUserController);
userRouter.post("/api/users/verify-opt", verifyOptController);
userRouter.delete("/api/users/delete", deleteUserController);
userRouter.post("/api/users/login", loginController);

export default userRouter;
