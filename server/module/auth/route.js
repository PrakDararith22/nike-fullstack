import express from "express";
import {
  registerUserController,
  deleteUserController,
  loginController,
  verifyOptController,
} from "./controller.js";
import {
  registerValidation,
  loginValidation,
  verifyOptValidation,
} from "../../middleware/userValidator.js";

const userRouter = express.Router();

userRouter.post("/users/register", registerValidation, registerUserController);
userRouter.post("/users/verify-opt", loginValidation, verifyOptController);
userRouter.delete("/users/delete", deleteUserController);
userRouter.post("/users/login", verifyOptValidation, loginController);

export default userRouter;
