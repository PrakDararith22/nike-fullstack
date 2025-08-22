import express from "express";
import {
  getCartController,
  addCartItemController,
  updateCartItemController,
  deleteCartItemController,
} from "./controller.js";
import { addCartItemValidation } from "../../middleware/cart-validation.js";

const cartRouter = express.Router();

cartRouter.route("/cart").get(getCartController).post(addCartItemValidation, addCartItemController);
cartRouter.route("/cart/:id").patch(updateCartItemController).delete(deleteCartItemController);

export default cartRouter;
